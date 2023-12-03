const express =require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const ratingModel = require('./models/Rating');

const app = express();


const port=3001;
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://singhshreya2907:8ZUC8zGaUOgAIUF8@cluster0.m7v5alg.mongodb.net/?retryWrites=true&w=majority').then(()=>{console.log("Dbconnected")}).catch((err)=>{console.log(err)});

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
        if(user.password===password){
           res.json("Success")
        }
        else{
            res.json("the password is incorrect")
        }
    }
    else{
        res.json("No record existed")
    }
    })
})
app.post("/home/brewery/:id/rating",(req,res)=>{
    ratingModel.create(req.body)
    .then((rating)=>res.json(rating))
    .catch((err) => res.status(500).json(err));
})
app.post('/', (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
});

app.get("/", (req, res) => {
  res.send("Welcome to Moengage");
});

app.listen(3001, () => {
  console.log('Server is running');
});
