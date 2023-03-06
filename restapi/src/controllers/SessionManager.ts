import UserSchema from "../entities/UserSchema"

interface SesionManager {
	cerrarSesion: () => boolean;
	iniciarSesion: (usuario: User) =>  User;
	registrarse: (usuario: User) =>  User;
	usuarioEnSesion: (usuario:  User) =>  User | null;
}

class UserSesionManager implements SesionManager{
	userInSession: User | null;

	constructor(){
		this.userInSession = null;
	}

	cerrarSesion(){
		this.userInSession = null;
        return true;
    }

	registrarse(usuario: User){
		this.userInSession = usuario;

		const usuarioSchema = new UserSchema({
			username: usuario.username,
			webID: usuario.webID,
			password: usuario.password
		});

		usuarioSchema.save();
        return usuario;
    }
	
	usuarioEnSesion(){
		let user : User | null = null;
		if(this.userInSession != null){
			user = {username:this.userInSession?.username, password:this.userInSession?.password, webID:this.userInSession?.webID};
		}
        return user;
    }
    
	iniciarSesion(user : User) {
		let usuarioEncontrado = UserSchema.findOne({
			username: user.username,
			password: user.password
		});

		if(user != null){
			this.userInSession = usuarioEncontrado
			return user;
		}

		console.log("Usuario no encontrado");
		return user
	}
	
}