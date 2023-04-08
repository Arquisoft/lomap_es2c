import { UserImpl } from "../entities/User";
import type { User } from "../facade";
import UserSchema from "../entities/UserSchema";
import mongoose from "mongoose";

export type { UserManager };
export { UserManagerImpl };

const bcrypt = require("bcryptjs");

interface UserManager {
    modificarPerfil: (user: User) => Promise<User>;
    listarDetalles: (user: User) => Promise<User>;
    buscarUsuario: (username: string) => Promise<User>;
}


class UserManagerImpl implements UserManager {
    public modificarPerfil(user: User) {
        return modificarUsuario(user);
    }
    public listarDetalles(user: User) {
        return buscarUsuarioPorUsername(user.username);
    }
    public buscarUsuario(username: string){
        return buscarUsuarioPorUsername(username);
    }
}


async function buscarUsuarioPorUsername(username: string) {

    const { uri, mongoose } = getBD();
    try {
        await mongoose.connect(uri);
    } catch {
        return new UserImpl("bderror", "", "");
    }

    let resultado: User;

    try {
        resultado = await UserSchema.findOne({ username: username }, { _id: 0, __v: 0 }) as User;
    } catch {
        throw new Error("Error al conectarse con la base de datos.")
    }

    if (resultado == null) { 
        throw new Error("El usuario no existe.")
    }

    
   
    return resultado;

}


function getBD() {
    const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);
    return { uri, mongoose };
}

async function modificarUsuario(user: User) {

    console.log("Editar: " + JSON.stringify(user))
    const { uri, mongoose } = getBD();
    try {
        await mongoose.connect(uri);
    } catch {
        return new UserImpl("bderror", "", "");
    }

    let resultado: User;
    try {
        resultado = await UserSchema.findOneAndUpdate({ username: user.username }, { webID: user.webID });
    } catch {
        return new UserImpl("bderror", "", "");
    }

    mongoose.connection.close();

    return resultado;

}