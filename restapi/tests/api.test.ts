import express, {Application, RequestHandler} from "express";
import bp from "body-parser";
import promBundle from "express-prom-bundle";
import { Server } from "http";
import request, { Response } from "supertest";
import apiUser from "../api";
import mongoose from "mongoose";

var server: Server;

const app: Application = express();

beforeAll(async () => {
    const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
    app.use(metricsMiddleware);

    app.use(bp.json());

    app.use(bp.urlencoded({ extended: false }));

    app.use(apiUser);

    server = app.listen(5000);

});
afterAll(async () => {
    server.close();
    await mongoose.connection.close();
});

describe('test conexión con api ', () => {
    /**
     * Test that we can list users without any error.
     */
     test('GET /',async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
    });
});

describe('test api metodos usermanager ', () => {
    /**
     * Test that we can list users without any error.
     */
    test('GET /',async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
    });
});
