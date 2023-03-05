import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';

const api:Router = express.Router()

const sessionManager: SesionManager = new UserSesionManager();

api.get(
    "/users/login",
    async (req: Request, res: Response): Promise<Response> => {
      let username = req.body.username;
      let password = req.body.password;
      let user: User = {username:username,password:password,webid:"null",img:"null"}

      user = sessionManager.iniciarSesion(user);
      
      if(user.webid=="null"){
        return res.status(400);
      }
      return res.status(200).send(user);
    }
);

api.get(
  "/users/signup",
  async (req: Request, res: Response): Promise<Response> => {
      let username = req.body.username;
      let password = req.body.password;
      let user: User = {username:username,password:password,webid:"nuevo",img:"nuevo"}

      sessionManager.iniciarSesion(user);

      return res.status(200).send(user);
  }
);

api.get(
  "/users/logout",
  async (req: Request, res: Response): Promise<Response> => {

      if(sessionManager.cerrarSesion()){
        return res.status(200);
      } 
      return res.status(400);

  }
);

// api.post(
//   "/users/add",[
//     check('name').isLength({ min: 1 }).trim().escape(),
//     check('email').isEmail().normalizeEmail(),
//   ],
//   async (req: Request, res: Response): Promise<Response> => {
//     let name = req.body.name;
//     let email = req.body.email;
//     let user: User = {name:name,email:email}
//     users.push(user);
//     return res.sendStatus(200);
//   }
// );

export default api;