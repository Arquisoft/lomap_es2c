import express, { Request, Response, Router } from 'express';
import { check } from 'express-validator';
import * as fac from './src/facade';

const api: Router = express.Router()

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post(
    "/users/add", [
    check('name').isLength({ min: 1 }).trim().escape(),
    check('email').isEmail().normalizeEmail(),
],
    async (req: Request, res: Response): Promise<Response> => {
        let name = req.body.name;
        let email = req.body.email;
        let user: User = { name: name, email: email }
        users.push(user);
        return res.sendStatus(200);
    }
);

api.get("/sesionmanager/user", async (req: Request, res: Response): Promise<Response> => {
    console.log("hi")
    let user = fac.FactoryLoMap.getSesionManager().usuarioEnSesion();
    console.log(user.username)
    return res.status(200).send(user);
})

api.post("/sesionmanager/signup", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    console.log(user.username)
    return res.status(200).send(fac.FactoryLoMap.getSesionManager().registrarse(user));
})

api.post("/sesionmanager/login", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    console.log(user.username)
    return res.status(200).send(fac.FactoryLoMap.getSesionManager().iniciarSesion(user));
})

export default api;