import mongoose from 'mongoose';
import User from '../entities/User';

const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri)
.then(() =>{
    console.log("Database succesfully connected")
})
.catch((err)=>{
    console.error(err);
});