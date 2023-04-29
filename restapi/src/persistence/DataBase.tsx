import mongoose from 'mongoose'
require("dotenv").config();

const uri = process.env.DATABASE_URL;
mongoose.connect(uri!);

const database = mongoose.connection;

database.once('open', (error: Error) => {
  console.log('Database succesfully connected!');
});

database.on('error', (error: Error) => {
  console.log('Database connection error:', error);
  process.exit();
})