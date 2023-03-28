import express, { Request, Response, Router } from 'express';
import { check } from 'express-validator';
import * as fac from './src/facade';

const api: Router = express.Router()

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state, but it is here for
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


api.post(
    "/usermanager/details", async (req: Request, res: Response): Promise<Response> => {
        let user = req.body.user;
        let u = await fac.FactoryLoMap.getUserManager().listarDetalles(user);
        if (u.username == "notfound") {
            return res.status(507).send("Usuario no encontrado para listar detalle");
        } else if (u.username == "bderror") {
            return res.status(508).send("Error en la conexión con la base de datos");
        }
        else {
            return res.status(200).send(u);
        }
    }
);

api.post(
    "/usermanager/edit",
    async (req: Request, res: Response): Promise<Response> => {
        let user = req.body.user;
        let u = await fac.FactoryLoMap.getUserManager().modificarPerfil(user);
        if (u.username == "notfound") {
            return res.status(507).send("Usuario no encontrado");
        } else if (u.username == "bderror") {
            return res.status(508).send("Error en la conexión con la base de datos");
        }
        else {
            return res.status(200).send(u);
        }
    }
);




api.get("/sesionmanager/user", async (req: Request, res: Response): Promise<Response> => {
    let user = fac.FactoryLoMap.getSesionManager().usuarioEnSesion();
    return res.status(200).send(user);
})

api.post("/sesionmanager/signup", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let userRes = await fac.FactoryLoMap.getSesionManager().registrarse(user);
    if (userRes.username == "userRepeated") {
        return res.status(509).send("Nombre de usuario ya existente")
    } else {
        return res.status(200).send(userRes);

    }
})

api.post("/sesionmanager/login", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    console.log(user)
    let userRes = await fac.FactoryLoMap.getSesionManager().iniciarSesion(user);
    console.log(userRes)
    if (userRes.username == "passwordNotFound") {
        return res.status(506).send("Usuario o contraseña errónea")
    } else {
        return res.status(200).send(userRes);

    }
    //IF / ELSES CON CADA POSIBLE ERROR Y EL STATUS ASOCIADO
})

api.post("/mapmanager/usermap", async (req: Request, res: Response): Promise<Response> => {
    let userRes = await fac.FactoryLoMap.getSesionManager().usuarioEnSesion();
    return res.status(200).send(userRes);
})

api.post("/friendmanager/friends", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let friends = await fac.FactoryLoMap.getFriendManager().listarAmigos(user)
    return res.status(200).send(friends);
})

export default api;