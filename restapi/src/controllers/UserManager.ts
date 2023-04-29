import type { User } from "../facade";
import UserSchema from "../entities/UserSchema";
import mongoose from "mongoose";
import * as repo from "../persistence/Repository"

export type { UserManager };
export { UserManagerImpl };

const bcrypt = require("bcryptjs");

interface UserManager {
    modificarPerfil: (user: User) => Promise<User>;
    listarDetalles: (user: User) => Promise<User>;
    buscarUsuario: (username: string) => Promise<User>;
    modificarContrasena: (user: User, oldpsw: string, newpsw: string) => Promise<User>;
}


class UserManagerImpl implements UserManager {
    public modificarPerfil(user: User) {
        return modificarUsuario(user);
    }
    public listarDetalles(user: User) {
        return buscarUsuarioPorUsername(user.username);
    }
    public buscarUsuario(username: string) {
        return buscarUsuarioPorUsername(username);
    }

    async modificarContrasena(user: User, oldpsw: string, newpsw: string): Promise<User> {
        let userBd
        try {
            userBd = await UserSchema.findOne({ username: user.username }, { _id: 0, __v: 0 }) as User;
        } catch {
            throw new Error("Ha ocurrido un fallo interno.")
        }
        if (userBd == null) throw new Error("El usuario no existe.");
        if (await bcrypt.compare(oldpsw, userBd.password)) {
            userBd.password = await bcrypt.hash(newpsw, 10)
            try {
                await repo.Repository.findOneAndUpdatePassword(userBd)
            } catch (e: any) {
                throw new Error("Fallo actualizando la contraseña");
            }
        } else {
            throw new Error("La contraseña antigua era incorrecta")
        }
        userBd.password = ""
        return userBd;
    }
}


async function buscarUsuarioPorUsername(username: string) {
    let resultado: User;
    try {
        resultado = await UserSchema.findOne({ username: username }, { _id: 0, __v: 0 }) as User;
    } catch {
        throw new Error("Ha ocurrido un fallo interno.")
    }
    if (resultado == null) {
        throw new Error("El usuario no existe.")
    }
    resultado.password = "";
    return resultado;

}

async function modificarUsuario(user: User) {

    let resultado: User;
    try {
        resultado = await repo.Repository.findOneAndUpdate(user)
    } catch (err) {
        throw new Error("Ha ocurrido un fallo interno.");
    }
    if (resultado == null) {
        throw new Error("Usuario no encontrado.");
    }
    resultado.password = "";
    return resultado;
}