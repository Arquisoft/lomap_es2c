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
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await repo.Repository.findOne(usuario)
        } catch (e: any) {
            throw new Error("Ha ocurrido un fallo interno.");
        }
        if (usuarioEncontrado != null) {
            throw new Error("Ya existe el usuario");
        }
        try {
            repo.Repository.save(usuario, this.rondasDeEncriptacion)
        } catch (e: any) {
            throw new Error("Ha ocurrido un fallo interno.");
        }
        return usuario;
    }

    async iniciarSesion(user: User): Promise<User> {
        let usuarioEncontrado
        try {
            usuarioEncontrado = await UserSchema.findOne({
                username: user.username
            }) as User;
        }
        catch (e: any) {
            throw new Error("Ha ocurrido un fallo interno.");
        }
        if (usuarioEncontrado != null) {
            if (await bcrypt.compare(user.password, usuarioEncontrado.password)) {
                return usuarioEncontrado;
            }
            throw new Error("Las credenciales no coinciden")
        } else {
            throw new Error("Las credenciales no coinciden")
        }
    }

}