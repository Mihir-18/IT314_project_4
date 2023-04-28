import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Comment from './models/Comment.js';
import VotingRoutes from './VotingRoutes.js'

const secret = 'secret123';
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
     origin: '*',
     // credentials: true,
}));

await mongoose.connect('mongodb+srv://suyash:rjoa7zvue5mGQagd@cluster0.1u8c2l7.mongodb.net/newsAggregator', { useNewUrlParser: true, useUnifiedTopology: true, });
const db = mongoose.connection;
db.on('error', console.log);

app.use(VotingRoutes);

function getUserFromToken(token){
     const userInfo = jwt.verify(token, secret);
     return User.findById(userInfo.id);
}

app.get('/', (req, res) => {
     res.send('Welcome to the server for News Aggregator');
});

app.post('/register', (req, res) => {
     const { email, username } = req.body;
     const password = bcrypt.hashSync(req.body.password, 10);
     User.findOne({ email }).then(user1 => {
          if (user1 == null) {
               User.findOne({ username }).then(user2 => {
                    if (user2 == null) {
                         const user = new User({ email, username, password });
                         user.save().then(user => {
                              jwt.sign({ id: user._id }, secret, (err, token) => {
                                   if (err) {
                                        console.log(err);
                                        res.status(400).send("Invalid Credentials!");
                                   }
                                   else {
                                        console.log(user);
                                        console.log(token);
                                        // let testAccount = nodemailer.createTestAccount();

                                        // let transporter = nodemailer.createTransport({
                                        //      host: 'smtp.ethereal.email',
                                        //      port: 587,
                                        //      auth: {
                                        //           user: 'oma.marvin@ethereal.email',
                                        //           pass: 'jDGWthYUW92sjnQjQA'
                                        //      }
                                        // });

                                        // let info = transporter.sendMail({
                                        //      from: '"News Aggregator" <oma.marvin@ethereal.email>', // sender address
                                        //      to: req.body.email, // list of receivers
                                        //      subject: "Registration Successful!", // Subject line
                                        //      text: "Your registration with News Aggregator is successful. Start your journey by making a post.", // plain text body
                                        //      // html: "<b>News Aggregator</b>", // html body
                                        // });
                                        res.status(200).cookie('token', token).send();
                                   }
                              });
                         }).catch(event => {
                              console.log(event);
                              res.status(400).send('Invalid Credentials!');
                         });
                    }
                    else {
                         console.log("Username already exist");
                         res.status(400).send('Username already exists!');
                    }
               }).catch(err => {
                    console.log(err);
                    res.status(400).send('Invalid Credentials!');
               });
          }
          else {
               console.log("Email already exist");
               res.status(400).send('Email already exists!');
          }
     }).catch(err => {
          console.log(err);
          res.status(400).send("Invalid Credentials!");
     });
});

app.get('/user', (req, res) => {
     const token = req.cookies.token;
     console.log('Current user token is: ' + token);
     getUserFromToken(token).then(user => {
          res.json({ username: user.username });
     }).catch(err => {
          console.log(err);
          res.sendStatus(500);
     });
     const userInfo = jwt.verify(token, secret);
});

app.post('/login', (req, res) => {
     const { username, password } = req.body;
     User.findOne({ username }).then(user => {
          if (user && user.username) {
               const passOk = bcrypt.compareSync(password, user.password);
               if (passOk) {
                    jwt.sign({ id: user._id }, secret, (err, token) => {
                         console.log(token);
                         res.cookie('token', token).send();
                    });
               } else {
                    res.status(400).send('Invalid username or password');
               }
          } else {
               res.status(400).send('Invalid username or password');
          }
     });
});

app.post('/logout', (req, res) => {
     res.cookie('token', '').send();
});

app.get('/comments', (req, res)=>{
     const search = req.query.search;
     const filters = search ? { body: { $regex: '.*' + search + '.*' } } : { rootId: null }
     Comment.find(filters).sort({postedAt: -1}).then(comments =>{
          res.json(comments);
     }).catch(err => {
          res.sendStatus(404);
     })
});

app.get('/comments/root/:rootId', (req, res)=>{
     Comment.find({rootId: req.params.rootId}).sort({postedAt: -1}).then(comments =>{
          res.status(200).json(comments);
     }).catch(err => {
          res.sendStatus(404);
     })
});


app.get('/comments/:id', (req, res)=>{
     Comment.findById(req.params.id).then(comment => {
          res.status(200).json(comment);
     }).catch(err => {
          res.sendStatus(404);
     });
});

app.post('/comments', (req, res)=>{
     const token= req.cookies.token;
     if(!token){
          res.sendStatus(404);
          return;
     }
     getUserFromToken(token).then(userInfo=>{
          const {title,body,parentId,rootId} = req.body;
          const comment = new Comment({
          title,
          body,
          author:userInfo.username,
          postedAt:new Date(),
          parentId,
          rootId,
          });
          comment.save().then(savedComment => {
               res.json(savedComment);
          }).catch(console.log);
          res.sendStatus(200);
     }).catch(()=>{
          res.sendStatus(600);
     });
});

app.listen(4000);