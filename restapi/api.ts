import express, { Request, Response, Router } from 'express';
import * as fac from './src/facade';

const api: Router = express.Router()

api.post(
    "/usermanager/edit",
    async (req: Request, res: Response): Promise<Response> => {
        let user = req.body.user;
        try {
            let u: any
            await fac.FactoryLoMap.getUserManager().modificarPerfil(user).then((user) => {
                u = user;
            });
            return res.status(200).send(u);
        } catch (err) {
            return res.status(404).send({ "error": err.message })
        }
    }
);

api.post("/sesionmanager/signup", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    try {
        let userRes: any
        await fac.FactoryLoMap.getSesionManager().registrarse(user).then((u) => {
            userRes = u;
        });
        return res.status(200).send(userRes);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/sesionmanager/login", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let userRes: any
    try {
        await fac.FactoryLoMap.getSesionManager().iniciarSesion(user).then((u) => {
            userRes = u;
        });
        return res.status(200).send(userRes);
    } catch (err: any) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/friendmanager/friendrequests", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    let solicitudes: any
    try {
        await fac.FactoryLoMap.getFriendManager().listarSolicitudes(user).then((s) => {
            solicitudes = s
        })
        return res.status(200).send(solicitudes);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/friendmanager/updaterequest/:status", async (req: Request, res: Response): Promise<Response> => {
    let status = req.params.status;
    let fr = req.body.friendrequest;
    let r: any
    try {
        await fac.FactoryLoMap.getFriendManager().actualizarSolicitud(fr, +status).then((fr) => {
            r = fr;
        })
        return res.status(200).send(r);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/friendmanager/friends", async (req: Request, res: Response): Promise<Response> => {
    let user = req.body.user;
    try {
        let r: any
        await fac.FactoryLoMap.getFriendManager().listarAmigos(user).then((fr) => {
            r = fr
        })
        return res.status(200).send(r);
    } catch (err) {
        return res.status(404).send({ "error": err.message })
    }
})

api.post("/friendmanager/add", async (req: Request, res: Response): Promise<Response> => {
    try {
        let userEnSesion = req.body.sender;
        let user = req.body.receiver;
        let r: any
        await fac.FactoryLoMap.getFriendManager().enviarSolicitud(userEnSesion, user).then((fr) => {
            r = fr;
        });
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
            let user: any
            await fac.FactoryLoMap.getUserManager().buscarUsuario(username).then((u) => {
                user = u;
            })
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
            let b: any
            await fac.FactoryLoMap.getFriendManager().eliminarAmigo(user, friend).then((bu) => {
                b = bu;
            })
            return res.status(200).send(b);
        } catch (err) {
            return res.status(404).send({ "error": err.message })
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
            let b: any
            await fac.FactoryLoMap.getUserManager().modificarContrasena(user, oldpsw, newpsw).then((bu) => {
                b = bu;
            })
            return res.status(200).send(b);
        } catch (err) {
            return res.status(404).send({ "error": err.message });
        }
    }
);
api.get(
    "/test",
    (req: Request, res: Response): Response => {
        return res.sendStatus(200);
    }
);


export default api;
