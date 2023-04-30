import express, { Application, RequestHandler } from 'express';
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api";
import dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');


const app: Application = express();
const port: number = Number.parseInt(`${process.env.PORT}`) || 5000;

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

app.disable("x-powered-by");

mongoose.connect('mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() =>{
  console.log('Database succesfully connected!');
});

app.use(cors());
app.use(bp.json());

app.use("/api", api)

app.use(cors({
    origin: ['https://lomapes2c.eastus.cloudapp.azure.com/' , 'http://localhost:3000', 'https://20.169.248.119:3000'],
    credentials:true
}));

app.listen(port, (): void => {
    console.log('Restapi listening on ' + port);
}).on("error", (error: Error) => {
    console.error('Error occured: ' + error.message);
});

export default app;
