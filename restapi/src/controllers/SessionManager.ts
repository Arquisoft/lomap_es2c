import UserSchema from "../entities/UserSchema";
import { User, SesionManager } from "../facade";
export { UserSesionManager };

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
        // this.userInSession = usuario;
        sessionStorage.setItem('userInSession', JSON.stringify(usuario));
        console.log("que")
        console.log(sessionStorage.getItem('userInSession'))

        const usuarioSchema = new UserSchema({
            username: usuario.username,
            webID: usuario.webID,
            password: await bcrypt.hash(usuario.password, this.rondasDeEncriptacion)
        });

        console.log(usuarioSchema.username)

        await usuarioSchema.save();
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
        let usuarioEncontrado = await UserSchema.findOne({
            username: user.username
            //password: user.password
        });
        console.log(usuarioEncontrado)

        if (usuarioEncontrado != null) {
            if(await bcrypt.compare(user.password, usuarioEncontrado.password)){
                // this.userInSession = usuarioEncontrado
                console.log(usuarioEncontrado)
                sessionStorage.setItem('userInSession', JSON.stringify(usuarioEncontrado));
                return user;
            }
            user.username = "passwordNotFound";
            return user;
        }
        user.username = "userNotFound";
        // console.log("Usuario no encontrado");
        return user
    }

}