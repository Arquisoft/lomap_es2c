import mongoose from 'mongoose'
require("dotenv").config();

const uri = process.env.DATABASE_URL;

mongoose.connect(uri).then(() => {
    console.log("Database succesfully connected")
}).catch((err) => {
    console.error(err);
});