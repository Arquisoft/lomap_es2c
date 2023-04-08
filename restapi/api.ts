import express, { Request, Response, Router } from 'express';
import { check } from 'express-validator';
import * as fac from './src/facade';
import { FriendRequest } from "./src/entities/FriendRequest";

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

api.get(
    "/usermanager/find/username",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const username = req.query.username.toString();
            const user = await fac.FactoryLoMap.getUserManager().buscarUsuario(username);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(404).send({ error: err.toString() })
        }
    }
);



api.post(
    "/usermanager/details", async (req: Request, res: Response): Promise<Response> => {
        let user = req.body.user;
        let u = await fac.FactoryLoMap.getUserManager().listarDetalles(user);
        if (u.username == "notfound") {
            return res.status(404).json({ error: "El usuario no existe." });
        } else if (u.username == "bderror") {
            return res.status(500).json({ error: "Error en la conexión con la base de datos" });
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
            return res.status(407).json("Usuario no encontrado");
        } else if (u.username == "bderror") {
            return res.status(408).json("Error en la conexión con la base de datos");
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
    return res.status(200).send(userRes);
})

api.post("/sesionmanager/login", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    console.log(user)
    let userRes = await fac.FactoryLoMap.getSesionManager().iniciarSesion(user);
    console.log(userRes)
    if (userRes.username == "passwordNotFound") {
        return res.status(506).send("Contraseña errónea")
    } else if (userRes.username == "userNotFound") {
        return res.status(507).send("Usuario no encontrado")
    }
    else {
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



api.post("/friendmanager/friendrequests", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let solicitudes = await fac.FactoryLoMap.getFriendManager().listarSolicitudes(user)
    return res.status(200).send(solicitudes);
})

api.post("/friendmanager/updaterequest/:status", async (req: Request, res: Response): Promise<Response> => {
    let status = req.params.status;
    let fr = req.body.friendrequest;
    let r = await fac.FactoryLoMap.getFriendManager().actualizarSolicitud(fr, +status);
    return res.status(200).send(r);
})

api.post("/friendmanager/friends", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let r = await fac.FactoryLoMap.getFriendManager().listarAmigos(user);
    return res.status(200).send(r);
})

api.post("/friendmanager/add", async (req: Request, res: Response): Promise<Response> => {
    let userEnSesion = req.body.sender;
    let user = req.body.receiver;
    let r = await fac.FactoryLoMap.getFriendManager().enviarSolicitud(userEnSesion, user);
    return res.status(200).send(r);
})

api.post("/friendmanager/requests", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let r = await fac.FactoryLoMap.getFriendManager().listarSolicitudes(user);
    return res.status(200).send(r);
})

api.get(
    "/usermanager/searchUserByUsername",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const username = req.query.username.toString();
            const user = await fac.FactoryLoMap.getUserManager().buscarUsuario(username);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(404).send({ error: err.toString() })
        }
    })



api.post(
    "/friendmanager/deletefriend",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = req.body.user;
            const friend = req.body.friend;
            const b = await fac.FactoryLoMap.getFriendManager().eliminarAmigo(user,friend);
            return res.status(200).json(b);
        } catch (err) {
            return res.status(404).send({ error: err.toString() })
        }
    }
);




export default api;