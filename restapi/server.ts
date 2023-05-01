import express, { Application, RequestHandler } from 'express';
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api";
import dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');


const app: Application = express();
const httpPort = 5000;
const httpsPort = 5001;

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

app.use(cors());

const options = {
  key: fs.readFileSync(process.env.SSL_PRIVKEY),
  cert: fs.readFileSync(process.env.SSL_CERT)
};

app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

https.createServer(options, app).listen(httpsPort, () => {
    console.log(`Restapi server started on port ${httpsPort}`);
  }).on("error", (error: Error) => {
      console.error("Error occured: " + error.message);
    });

app.listen(httpPort, (): void => {
    console.log('Restapi listening on ' + httpPort);
}).on("error", (error: Error) => {
    console.error('Error occured: ' + error.message);
});


export default app;
