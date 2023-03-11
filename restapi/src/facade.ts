import { UserSesionManager } from './controllers/SessionManager'
import { UserManager } from './controllers/UserManager'

export { FactoryLoMap };
export type { UserInt, SesionManager };

interface SesionManager {
    cerrarSesion: () => boolean;
    iniciarSesion: (usuario: UserInt) => UserInt;
    registrarse: (usuario: UserInt) => UserInt;
    usuarioEnSesion: () => UserInt;
}

//TODOS LOS BOOLEAN QUE DEVUELVEN LOS MÉTODOS SON ÚNICAMENTE PARA NOTIFICAR EL RESULTADO DE LA OPERACION
//ES INTERCAMBIABLE POR INT O STRING CON UN CODIGO DEFINIDO

//#region FACADE
/*
interface MapManager {
    verMapaDe: (user: UserInt) => Group[];
    añadirLugarAGrupo: (lugar: Place, grupo: Group) => Group;
    crearGrupo: (nombre: Group) => Group;
    eliminarGrupo: (grupo: Group) => boolean;
    eliminarLugarDeGrupo: (lugar: Place, grupo: Group) => Group;
    aplicarFiltro: (grupo: Group, filtro: string) => Place[];
    editarGrupo: (grupo: Group) => Group;
    mostrarGrupo: (grupo: Group) => Place[];
}

interface FriendManager {
    listarAmigos: (user: UserInt) => UserInt[];
    enviarSolicitud: (de: UserInt, a: UserInt) => FriendRequest;
    aceptarSolicitud: (solicitud: FriendRequest) => FriendRequest;
    rechazarSolicitud: (solicitud: FriendRequest) => FriendRequest;
    listarSolicitudes: (user: UserInt) => FriendRequest[];
}
*/
//#endregion

//#region INTERFACES AUXILIARES

class FactoryLoMap {
    //static getMapManager: () => MapManager;
    static getUserManager: () => UserManager;
    //static getFriendManager: () => FriendManager;

    static getSesionManager(): SesionManager {
        return new UserSesionManager();
    }
}
//#endregion

//#region CLASES DE EJEMPLO PARA FUNCIONAR
class FriendRequest { }
class Group { }
class Place { }
//#endregion

interface UserInt {
    username: String
    password: String
    webID: String
}
