import express, { Request, Response, Router } from 'express';
import { check } from 'express-validator';
import * as fac from './src/facade';
import { FriendRequest } from "./src/entities/FriendRequest";
import { deprecate } from "util";

const api: Router = express.Router()

interface User {
    name: string;
    email: string;
}


api.get(
    "/usermanager/find/username",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const username = req.query.username.toString();
            const user = await fac.FactoryLoMap.getUserManager().buscarUsuario(username);
            return res.status(200).send(user);
        } catch (err) {
            return res.status(404).send({ "error": err.message })
        }
    }
);

api.post(
    "/usermanager/edit",
    async (req: Request, res: Response): Promise<Response> => {
        let user = req.body.user;
        try {
            let u = await fac.FactoryLoMap.getUserManager().modificarPerfil(user);
            return res.sendStatus(200);
        } catch (err) {
            return res.status(404).send({ "error": err.message })
        }
    }
);

api.post("/sesionmanager/signup", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    try {
        let userRes = await fac.FactoryLoMap.getSesionManager().registrarse(user);
        return res.status(200).send(userRes);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/sesionmanager/login", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let userRes
    try {
        userRes = await fac.FactoryLoMap.getSesionManager().iniciarSesion(user);
        return res.status(200).send(userRes);
    } catch (err: any) {
        console.log(err)
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/friendmanager/friendrequests", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let solicitudes = null
    try {
        solicitudes = await fac.FactoryLoMap.getFriendManager().listarSolicitudes(user)
        return res.status(200).send(solicitudes);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/friendmanager/updaterequest/:status", async (req: Request, res: Response): Promise<Response> => {
    let status = req.params.status;
    let fr = req.body.friendrequest;
    let r = null
    try {
        r = await fac.FactoryLoMap.getFriendManager().actualizarSolicitud(fr, +status);
        return res.status(200).send(r);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/friendmanager/friends", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    try {
        let r = await fac.FactoryLoMap.getFriendManager().listarAmigos(user);
        return res.status(200).send(r);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/friendmanager/add", async (req: Request, res: Response): Promise<Response> => {
    try {
        let userEnSesion = req.body.sender;
        let user = req.body.receiver;
        let r = await fac.FactoryLoMap.getFriendManager().enviarSolicitud(userEnSesion, user);
        return res.status(200).send(r);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.get(
    "/usermanager/searchUserByUsername",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const username = req.query.username.toString();
            const user = await fac.FactoryLoMap.getUserManager().buscarUsuario(username);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(404).send({ "error": err.message })
        }
    }
);



api.post(
    "/friendmanager/deletefriend",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const user = req.body.user;
            const friend = req.body.friend;
            const b = await fac.FactoryLoMap.getFriendManager().eliminarAmigo(user, friend);
            return res.status(200).send(b);
        } catch (err) {
            return res.status(404).send({ error: { "error": err.message } })
        }
    }
);

api.post(
    "/usermanager/editpsw",
    async (req: Request, res: Response): Promise<Response> => {
        try {
            const oldpsw = req.body.oldpsw;
            const newpsw = req.body.newpsw;
            const user = req.body.user;
            const b = await fac.FactoryLoMap.getUserManager().modificarContrasena(user, oldpsw, newpsw);
            return res.status(200).send(b);
        } catch (err) {
            return res.status(404).send({ error: { "error": err.message } })
        }
    }
);
api.get(
    "/test",
    async (req: Request, res: Response): Promise<Response> => {
           return res.sendStatus(200);
    }
);

export default api;