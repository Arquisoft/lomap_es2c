import UserSchema from "../entities/UserSchema";
import { User, SesionManager } from "../facade";
export { UserSesionManager };
import * as repo from "../persistence/Repository"
import mongoose from "mongoose";
const sessionStorage = require('sessionstorage-for-nodejs')
const bcrypt = require("bcryptjs");

class UserSesionManager implements SesionManager {

    rondasDeEncriptacion = 10
    // userInSession: User | null;

    constructor() {
        // this.userInSession = null;
    }

    async registrarse(usuario: User): Promise<User> {
        let usuarioEncontrado = await repo.Repository.findOne(usuario)
        if (usuarioEncontrado.username != "notfound") {
            throw new Error("Usuario ya existente")
        }
        await repo.Repository.save(usuario, this.rondasDeEncriptacion)
        return usuario;
    }

    async iniciarSesion(user: User): Promise<User> {
        let usuarioEncontrado = await UserSchema.findOne({
            username: user.username
        }) as User;
        if (usuarioEncontrado != null) {
            if (await bcrypt.compare(user.password, usuarioEncontrado.password)) {
                return usuarioEncontrado;
            }
            throw new Error("Contraseña incorrecta")
        } else {
            throw new Error("Usuario no encontrado")
        }
    }

}