const express = require("express");

const app = express(); //express app, act as a middleware

const bodyParser = require("body-parser"); //imnport body-parser

const CreateCategory = require('./models/createCategory');

const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense');

const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://root:54ew3SBbkM963U81@cluster0.ywmh36y.mongodb.net/expenseTracker')
.then(()=>{
  console.log("Connected to database");
})
.catch(()=>{
  console.log("Not able to connect to database");
})


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,authentication",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.post('/v1/api/CREATE_CATEGORY',(req,res,next)=>{
  const allCategory=new CreateCategory({
    categories:req.body.categories,
  })
  allCategory.save().then((result)=>{
    res.status(201).json({
      message:"Successfully Added",
      status:"200",
    })
    next();
  })
});

app.get('/v1/api/GET_ALL_CATEGORY',(req,res,next)=>{

  CreateCategory.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "SuccessFully Fetched",
      data: documents,
      status: "200 OK",
    });
    next();
  });
});

app.use('/v1/api',expenseRoutes);
app.use('/v1/api/USER',userRoutes);

module.exports = app;
