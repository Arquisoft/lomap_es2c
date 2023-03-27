import { UserImpl } from "../entities/User";
import type { User } from "../facade";
import UserSchema from "../entities/UserSchema";
import mongoose from "mongoose";

export type { UserManager };
export { UserManagerImpl };

const bcrypt = require("bcryptjs");
//import UserSchema from '../entities/UserSchema'
interface UserManager {
    modificarPerfil: (user: User) => Promise<User>;
    listarDetalles: (user: User) => Promise<User>;
}


class UserManagerImpl implements UserManager {
    public modificarPerfil(user: User) {
        return modificarUsuario(user);
    }
    public listarDetalles(user: User) {
        return buscarUsuarioPorUsername(user);
    }
}


async function buscarUsuarioPorUsername(u: User) {

    const { uri, mongoose } = getBD();
    try {
        await mongoose.connect(uri);
    } catch {
        return new UserImpl("bderror", "", "");
    }

    let resultado: User;

    try {
        resultado = await UserSchema.findOne({ username: u.username }, { _id: 0, __v: 0 }) as User;
    } catch {
        return new UserImpl("bderror", "", "");
    }

    if (resultado == null) { return new UserImpl("notfound", "", "") };

    console.log("Res:" + resultado);
    /*
    resultado = resultado.toString();
    mongoose.connection.close();

    resultado = resultado.replace("username", '"username"');
    resultado = resultado.replace("img", '"img"');
    resultado = resultado.replace("password", '"password"');
    resultado = resultado.replace("webid", '"webid"');
    resultado = resultado.replaceAll("'", '"');
    resultado = deleteSecondLine(resultado);

    let b = JSON.parse(resultado);
    */

    return resultado;

}

/*prueba().catch(err => console.log(err));

async function prueba() {
    
    const u=buscarUsuarioPorUsername(new User("adri","","",""));
    console.log((await u).img);
    console.log("gola");

}*/

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
/*
prueba().catch(err => console.log(err));

async function prueba() {
    
    const u=modificarUsuario(new User("adrokoelloco","80","80","80"));
    console.log((await u).webid);



}*/
