import { UserImpl } from "../entities/User";
import type { User } from "../facade";

export type { UserManager };
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

    //const uri = "mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
    const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri);

    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        webid: String,
        img: String
    });


    const usuario = mongoose.model('users', userSchema);

    let resultado = await usuario.findOne({ username: u.username });

    if (resultado == null) { return null };
    console.log(resultado);
    resultado = resultado.toString();
    mongoose.connection.close();

    resultado = resultado.replace("username", '"username"');
    resultado = resultado.replace("img", '"img"');
    resultado = resultado.replace("password", '"password"');
    resultado = resultado.replace("webid", '"webid"');
    resultado = resultado.replaceAll("'", '"');
    resultado = deleteSecondLine(resultado);

    let b = JSON.parse(resultado);

    return new UserImpl(b.username, b.password, b.webid);

}
function deleteSecondLine(json: string): string {
    let jsonArray: string[] = json.split("\n");
    jsonArray.splice(1, 1);
    return jsonArray.join("\n");
}

/*prueba().catch(err => console.log(err));

async function prueba() {
    
    const u=buscarUsuarioPorUsername(new User("adri","","",""));
    console.log((await u).img);
    console.log("gola");

}*/




async function modificarUsuario(user: User) {

    //const uri = "mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
    const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority"

    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri);

    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        webid: String,
        img: String
    });

    const usuario = mongoose.model('users', userSchema);

    const resultado = await usuario.updateOne({ username: user.username }, { webid: user.webID, password: user.password });
    console.log(resultado.modifiedCount);

    mongoose.connection.close();

    return user;

}
/*
prueba().catch(err => console.log(err));

async function prueba() {
    
    const u=modificarUsuario(new User("adrokoelloco","80","80","80"));
    console.log((await u).webid);



}*/
