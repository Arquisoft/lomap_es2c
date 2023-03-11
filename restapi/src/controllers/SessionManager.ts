import UserSchema from "../entities/UserSchema"
import { UserInt, SesionManager } from "../facade";
export { UserSesionManager };

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

    registrarse(usuario: UserInt) {
        // this.userInSession = usuario;
        sessionStorage.setItem('userInSession', JSON.stringify(usuario));

        const usuarioSchema = new UserSchema({
            username: usuario.username,
            webID: usuario.webID,
            password: usuario.password
        });

        usuarioSchema.save();
        return usuario;
    }

    usuarioEnSesion() {
        // let user : User | null = null;
        // if(this.userInSession != null){
        // 	user = {username:this.userInSession?.username, password:this.userInSession?.password, webID:this.userInSession?.webID};
        // }
        return JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as UserInt;
    }

    iniciarSesion(user: UserInt) {
        let usuarioEncontrado = UserSchema.findOne({
            username: user.username,
            password: user.password
        });

        if (user != null) {
            // this.userInSession = usuarioEncontrado
            sessionStorage.setItem('userInSession', JSON.stringify(usuarioEncontrado));
            return user;
        }

        console.log("Usuario no encontrado");
        return user
    }

}