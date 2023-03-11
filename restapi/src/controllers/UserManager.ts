import User from '../entities/User'
import UserSchema from '../entities/UserSchema'
interface UserManager {
    modificarPerfil: (user: User) => User;
    listarDetalles: (user: User) => User;
}


class UserManagerImpl implements UserManager{
    
    
    listarDetalles(user: User) {





        const uri="mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animals?retryWrites=true&w=majority";
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);

    this.conectarse(mongoose,uri);

    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        webid: String,
        img: String
       });

    const usuario = mongoose.model('animals', userSchema);

    const resultado = this.buscar(user.username,usuario)
    console.log(resultado);

    mongoose.connection.close();    

    const str='{"username": "adrokoelloco","webid": "69","img": "imagen","password": "hola"}';
    
    let b;
    Object.assign(resultado,b);

    return new User(b.username,b.password,b.webid,b.img);
    }

    private async conectarse(mongoose,uri){
        await mongoose.connect(uri);
    }

    private async buscar(nombre,usuario){
        return await usuario.findOne({username:nombre},'username password webid img').exec();
    }


    modificarPerfil(user: User){
        
        const uri="mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);

    this.conectarse(mongoose,uri);

    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        webid: String,
        img: String
       });

    const usuario = mongoose.model('animal', userSchema);

    const resultado = this.actualizar(usuario,user);
    //console.log(resultado.modifiedCount);

    mongoose.connection.close();    

    return user;


    }
    private async actualizar(usuario,user){
        return await usuario.updateOne({username:user.username},{webid:user.webid,img:user.img,password:user.password});
    }
}



async function buscarUsuarioPorUsername(u:User){

    const uri="mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri);

    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        webid: String,
        img: String
       });

    const usuario = mongoose.model('animals', userSchema);

    let resultado = await usuario.findOne({username:u.username});
    
    if(resultado==null){return null};
    console.log(resultado);
    resultado=resultado.toString();
    mongoose.connection.close();    
    
    resultado=resultado.replace("username",'"username"');
    resultado=resultado.replace("img",'"img"');
    resultado=resultado.replace("password",'"password"');
    resultado=resultado.replace("webid",'"webid"');
    resultado=resultado.replaceAll("'",'"');
    resultado= deleteSecondLine(resultado);

    let b=JSON.parse(resultado);

    return new User(b.username,b.password,b.webid,b.img);

}
function deleteSecondLine(json: string): string {
    let jsonArray: string[] = json.split("\n");
    jsonArray.splice(1, 1);
    return jsonArray.join("\n");
  }

prueba().catch(err => console.log(err));

async function prueba() {
    
    const u=buscarUsuarioPorUsername(new User("adri","","",""));
    console.log((await u).img);
    console.log("gola");

}




async function modificarUsuario(user:User){

    const uri="mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);

    await mongoose.connect(uri);

    const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        webid: String,
        img: String
       });

    const usuario = mongoose.model('animal', userSchema);

    const resultado = await usuario.updateOne({username:user.username},{webid:user.webID,img:user.img,password:user.password});
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
