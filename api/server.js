import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import nodemailer from "nodemailer";


const secret = 'secret123';
const app = express();
// const nodemailer = require("nodemailer");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true,
}));

await mongoose.connect('mongodb://0.0.0.0:27017/newsAggregator', { useNewUrlParser: true, useUnifiedTopology: true, });
const db = mongoose.connection;
db.on('error', console.log);


function getUserFromToken(token) {
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
                                        let testAccount = nodemailer.createTestAccount();

                                        let transporter = nodemailer.createTransport({
                                             host: 'smtp.ethereal.email',
                                             port: 587,
                                             auth: {
                                                  user: 'oma.marvin@ethereal.email',
                                                  pass: 'jDGWthYUW92sjnQjQA'
                                             }
                                        });

                                        let info = transporter.sendMail({
                                             from: '"News Aggregator" <oma.marvin@ethereal.email>', // sender address
                                             to: req.body.email, // list of receivers
                                             subject: "Registration Successful!", // Subject line
                                             text: "Your registration with News Aggregator is successful. Start your journey by making a post.", // plain text body
                                             // html: "<b>News Aggregator</b>", // html body
                                        });
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

app.get('/comments', (req, res) => {
     Comment.find().sort({ postedAt: -1 }).then(comments => {
          res.json(comments);
     });
});

app.get('/comments/:id', (req, res) => {
     Comment.findById(req.params.id).then(comment => {
          res.json(comment);
     });
});

app.post('/comments', (req, res) => {
     const token = req.cookies.token;
     if (!token) {
          res.sendStatus(401);
          return;
     }
     getUserFromToken(token).then(userInfo => {
          const { title, body } = req.body;
          const comment = new Comment({ title, body, author: userInfo.username, postedAt: new Date(), });
          comment.save().then(savedComment => {
               res.json(savedComment);
          }).catch(console.log);
     }).catch(() => {
          res.sendStatus(401);
     });
});

app.listen(4000);