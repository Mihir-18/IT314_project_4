import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import VotingRoutes from "./VotingRoutes.js";

const secret='secret123';
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json()); 

app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true,
}));

app.use(VotingRoutes);

await mongoose.connect('mongodb://0.0.0.0:27017/News_Aggregator', {useNewUrlParser:true, useUnifiedTopology:true,});
const db=mongoose.connection;
db.on('error', console.log);

app.get('/', (req, res) => {
     res.send('ok');
});

app.post('/register', (req, res)=>{
     const {email,username}=req.body;
     console.log(req.body);
     const password=bcrypt.hashSync(req.body.password, 10);
     const user= new User({email,username,password});
     user.save().then(user =>{
          jwt.sign({id:user._id}, secret, (err, token) =>{
               if(err){
                    console.log(err);
                    res.sendStatus(500);
               }
               else{
                    console.log(token);
                    res.status(201).cookie('token', token).send();
               }
          });
     }).catch(event =>{
          console.log(event);
          res.sendStatus(500);
     }); 
});

app.get('/user', (req, res) => {
     const token =req.cookies.token;
     console.log({token});
     const userInfo=jwt.verify(token, secret);
     User.findById(userInfo.id).then(user => {
               res.json({username:user.username});
     }).catch(err => {
          console.log(err);
          res.sendStatus(500);
     });
});

app.post('/login', (req, res) => {
     const {username, password} =req.body;
     User.findOne({username}).then(user => {
          if(user && user.username ){
               const passOk=bcrypt.compareSync(password, user.password);
               if(passOk){
                    jwt.sign({id:user._id}, secret, (err, token) =>{
                         res.cookie('token', token).send();
                    });
               } else {
                    res.status(422).json('Invalid username or password');
               }
          } else{
               res.status(422).json('Invalid username or password');
          }
     });
});

app.post('/logout', (req, res)=>{
     res.cookie('token', '').send();
});
app.listen(4000);