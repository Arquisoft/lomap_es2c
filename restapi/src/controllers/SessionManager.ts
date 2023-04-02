import UserSchema from "../entities/UserSchema";
import { User, SesionManager } from "../facade";
import * as repo from '../persistence/Repository';
export { UserSesionManager };

const bcrypt = require("bcryptjs");

class UserSesionManager implements SesionManager {

    rondasDeEncriptacion = 10

    constructor() {
    }

    cerrarSesion() {
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
        return JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User;
    }

    async iniciarSesion(user: User): Promise<User> {
        let usuarioEncontrado = await repo.Repository.findOne(user)

        if (usuarioEncontrado != null) {
            if (await bcrypt.compare(user.password, usuarioEncontrado.password)) {
                return usuarioEncontrado;
            }
            user.username = "passwordNotFound";
            return user;
        }
        user.username = "userNotFound";
        return user
    }

}