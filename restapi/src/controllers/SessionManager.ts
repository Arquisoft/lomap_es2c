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

    cerrarSesion() {
        // this.userInSession = null;
        sessionStorage.removeItem('userInSession')
        return true;
    }

    async registrarse(usuario: User): Promise<User> {
        let usuarioEncontrado = await repo.Repository.findOne(usuario)
        console.log(usuarioEncontrado)
        if (usuarioEncontrado.username != "notfound") {
            usuario.username = "userRepeated"
            return usuario
        }


        repo.Repository.save(usuario, this.rondasDeEncriptacion)
        return usuario;
    }

    usuarioEnSesion() {
        // let user : User | null = null;
        // if(this.userInSession != null){
        // 	user = {username:this.userInSession?.username, password:this.userInSession?.password, webID:this.userInSession?.webID};
        // }
        return JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User;
    }

    async iniciarSesion(user: User): Promise<User> {
        const { uri, mongoose } = UserSesionManager.getBD();
        await UserSesionManager.OpenConnection(uri, mongoose);


        let usuarioEncontrado = await UserSchema.findOne({
            username: user.username
            //password: user.password
        }) as User;
        await UserSesionManager.CloseConnection(mongoose)
        if (usuarioEncontrado != null) {
            if (await bcrypt.compare(user.password, usuarioEncontrado.password)) {
                return usuarioEncontrado;
            }
            user.username = "passwordNotFound";
            return user;
        }else{
            throw new Error("Usuario no encontrado")
        }
        user.username = "userNotFound";
        // console.log("Usuario no encontrado");
        return user
    }


    private static getBD() {
        const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
        const mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        return { uri, mongoose };
    }
    private static async OpenConnection(uri: string, mongoose: any){
        try {
            await mongoose.connect(uri);
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }
    }

    private static async CloseConnection(mongoose: any) {
        mongoose.connection.close();
    }

}