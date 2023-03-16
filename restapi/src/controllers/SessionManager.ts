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

    async registrarse(usuario: User): Promise<User> {
        // this.userInSession = usuario;
        sessionStorage.setItem('userInSession', JSON.stringify(usuario));
        const usuarioSchema = new UserSchema({
            username: usuario.username,
            webID: usuario.webID,
            password: usuario.password
        });

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
            username: user.username,
            password: user.password
        });

        if (usuarioEncontrado != null) {
            // this.userInSession = usuarioEncontrado
            sessionStorage.setItem('userInSession', JSON.stringify(usuarioEncontrado));
            return usuarioEncontrado;
        }
        else {
            sessionStorage.setItem('userInSession', null);
            return null;
        }
    }

}