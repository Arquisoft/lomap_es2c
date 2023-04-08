import { UserImpl } from "../entities/User";
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
    modificarContrasena:(user:User,oldpsw:string,newpsw:string)=>Promise<User>;
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
        const { uri, mongoose } = getBD();
        try {
            await mongoose.connect(uri);
        } catch {
            throw new Error("Error al conectarse con la base de datos.")
        }
        let userBd
        try {

            userBd = await UserSchema.findOne({ username: user.username }, { _id: 0, __v: 0}) as User;
        } catch {
            throw new Error("El usuario no se encuentra")
        }

        if(await bcrypt.compare(oldpsw, userBd.password)){
            console.log(await bcrypt.compare(oldpsw, userBd.password))
            userBd.password=await bcrypt.hash(newpsw, 10)
            await repo.Repository.findOneAndUpdatePassword(userBd)

        }else{
            throw new Error("La contraseña antigua era incorrecta")
        }
        //userBd.password=""
        return userBd;
    }
}


async function buscarUsuarioPorUsername(username: string) {

    const { uri, mongoose } = getBD();
    try {
        await mongoose.connect(uri);
    } catch {
        throw new Error("Error al conectarse con la base de datos.")
    }

    let resultado: User;

    try {
        resultado = await UserSchema.findOne({ username: username }, { _id: 0, __v: 0 }) as User;
        resultado.password="";
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

    /*
    console.log("Editar: " + JSON.stringify(user))
    const { uri, mongoose } = getBD();
    try {
        await mongoose.connect(uri);
    } catch {
        return new UserImpl("bderror", "", "");
    }
    */

    let resultado: User;
    try{
        resultado = await repo.Repository.findOneAndUpdate(user)
    }catch(err){
        throw new Error("Error al conectarse con la base de datos.");
    }
    /*
    try {
        resultado = await UserSchema.findOneAndUpdate({ username: user.username }, { webID: user.webID });
    } catch {
        return new UserImpl("bderror", "", "");
    }

    mongoose.connection.close();
    */
    resultado.password="";
    return resultado;

}
/*
prueba().catch(err => console.log(err));

async function prueba() {
    
    const u=modificarUsuario(new User("adrokoelloco","80","80","80"));
    console.log((await u).webid);



}*/

//let a=new UserManagerImpl();
//a.modificarContrasena(new UserImpl("security","","",""),"12345A...","hola").then(a=>console.log(a));