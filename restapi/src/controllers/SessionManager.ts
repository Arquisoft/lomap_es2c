import User from "../persistence/UserSchema";
let hola=require("./User");

interface SesionManager {
	cerrarSesion: () => boolean;
	iniciarSesion: (usuario: User) =>  User;
	registrarse: (usuario: User) =>  User;
	usuarioEnSesion: (usuario:  User) =>  User | null;
}

class UserSesionManager implements SesionManager{
	userInSession: User | null;

	//This is not a restapi as it mantains state but it is here for
	//simplicity. A database should be used instead.
	users: Array<User> = [];

	constructor(){
		this.userInSession = null;
		this.users = [];
	}

	cerrarSesion(){
		this.userInSession = null;
        return true;
    }

	registrarse(usuario: User){
		this.userInSession = usuario;
		this.users.push(usuario);
        return usuario;
    }
	
	usuarioEnSesion(){
		let user : User | null = null;
		if(this.userInSession != null){
			user = {username:this.userInSession?.username, password:this.userInSession?.password, webid:this.userInSession?.webid, img:this.userInSession?.img};
		}
        return user;
    }
    
	iniciarSesion(user : User) {
		this.users.forEach(element => {  
			if(element.username == user.username
			  && element.password == user.password){
				console.log(user.username)
				this.userInSession = user;
				
				return element;
			}
		});

		console.log("Usuario no encontrado");
		return user
	}
	
}