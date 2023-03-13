import UserSchema from "../entities/UserSchema";
import { User, SesionManager } from "../facade";
export { UserSesionManager };

const sessionStorage = require('sessionstorage-for-nodejs')

class UserSesionManager implements SesionManager {
    // userInSession: User | null;

    constructor() {
        // this.userInSession = null;
    }

    cerrarSesion() {
        // this.userInSession = null;
        sessionStorage.removeItem('userInSession')
        return true;
    }

    registrarse(usuario: User) {
        // this.userInSession = usuario;
        sessionStorage.setItem('userInSession', JSON.stringify(usuario));
        console.log("que")
        console.log(sessionStorage.getItem('userInSession'))

        const usuarioSchema = new UserSchema({
            username: usuario.username,
            webID: usuario.webID,
            password: usuario.password
        });

        console.log(usuarioSchema.username)

        usuarioSchema.save();
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
            username: user.username,
            password: user.password
        });

        if (usuarioEncontrado != null) {
            // this.userInSession = usuarioEncontrado
            console.log(usuarioEncontrado)
            sessionStorage.setItem('userInSession', JSON.stringify(usuarioEncontrado));
            return user;
        }

        console.log("Usuario no encontrado");
        return user
    }

}