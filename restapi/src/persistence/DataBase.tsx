var mongoose = require('mongoose');
require("dotenv").config();

const uri:string = process.env.DATABASE_URL;

mongoose.connect(uri!).then(() =>{
  console.log('Database succesfully connected!');
});