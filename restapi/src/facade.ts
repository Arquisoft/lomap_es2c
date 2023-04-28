
import { UserSesionManager } from './controllers/SessionManager'
import { UserManager, UserManagerImpl } from './controllers/UserManager'
import { FriendManager, FriendManagerImpl } from './controllers/FriendManager'


export interface SesionManager {
  iniciarSesion: (usuario: User) => Promise<User>;
  registrarse: (usuario: User) => Promise<User>;
}

//TODOS LOS BOOLEAN QUE DEVUELVEN LOS MÉTODOS SON ÚNICAMENTE PARA NOTIFICAR EL RESULTADO DE LA OPERACION
//ES INTERCAMBIABLE POR INT O STRING CON UN CODIGO DEFINIDO




//#region INTERFACES AUXILIARES

export class FactoryLoMap {
  static getFriendManager(): FriendManager {
    return new FriendManagerImpl();
  }

  static getSesionManager(): SesionManager {
    return new UserSesionManager();
  }

  static getUserManager(): UserManager {
    return new UserManagerImpl();
  }

}
//#endregion

//#region CLASES DE EJEMPLO PARA FUNCIONAR
class FriendRequest {}
// class Group { }
// class Place { }
//#endregion

export interface User {
  username: string;
  password: string;
  webID: string;
  description: string;
  img: string;
}



