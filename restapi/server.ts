import express, { Application, RequestHandler } from 'express';
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api";
import * as repo from "./src/persistence/Repository";
import {UserImpl} from "./src/entities/User";
import dotenv from 'dotenv';
dotenv.config();


const app: Application = express();
const port: number = 5000;

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

require('./src/persistence/DataBase')

app.use(cors());
app.use(bp.json());

app.use("/api", api)

app.listen(port, (): void => {
    console.log('Restapi listening on ' + port);
}).on("error", (error: Error) => {
    console.error('Error occured: ' + error.message);
});

export default app;
