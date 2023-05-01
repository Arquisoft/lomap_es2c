let mongoose = require('mongoose');
require("dotenv").config();

const uri = process.env.DATABASE_URL;

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database succesfully connected!');
    }).catch((error: any) => {
        console.log('Error connecting to database:', error);
    });