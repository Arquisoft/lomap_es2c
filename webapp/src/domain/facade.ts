
export { Place, UserSesionManager, FactoryLoMap };
export type { User };

//TODOS LOS BOOLEAN QUE DEVUELVEN LOS MÉTODOS SON ÚNICAMENTE PARA NOTIFICAR EL RESULTADO DE LA OPERACION
//ES INTERCAMBIABLE POR INT O STRING CON UN CODIGO DEFINIDO

//#region FACADE
interface MapManager {
    verMapaDe: (user: User) => Group[];
    añadirLugarAGrupo: (lugar: Place, grupo: Group) => Group;
    crearGrupo: (nombre: Group) => Group;
    eliminarGrupo: (grupo: Group) => boolean;
    eliminarLugarDeGrupo: (lugar: Place, grupo: Group) => Group;
    aplicarFiltro: (grupo: Group, filtro: string) => Place[];
    editarGrupo: (grupo: Group) => Group;
    mostrarGrupo: (grupo: Group) => Place[];
}

interface SesionManager {
    cerrarSesion: () => boolean;
    iniciarSesion: (usuario: User) => User;
    registrarse: (usuario: User) => User;
    usuarioEnSesion: (usuario: User) => User;
}

interface FriendManager {
    listarAmigos: (user: User) => User[];
    enviarSolicitud: (de: User, a: User) => FriendRequest;
    aceptarSolicitud: (solicitud: FriendRequest) => FriendRequest;
    rechazarSolicitud: (solicitud: FriendRequest) => FriendRequest;
    listarSolicitudes: (user: User) => FriendRequest[];
}

interface UserManager {
    modificarPerfil: (user: User) => User;
    listarDetalles: (user: User) => User;
}
//#endregion

//#region INTERFACES AUXILIARES
interface User {
    username: String
    password: String
    webid: String
    img: String
}

class FactoryLoMap {
    static getMapManager: () => MapManager;
    static getUserManager: () => UserManager;
    static getFriendManager: () => FriendManager;

    static getSesionManager(): UserSesionManager {
        return new UserSesionManager();
    }
}
//#endregion

//#region CLASES DE EJEMPLO PARA FUNCIONAR
class UserSesionManager implements SesionManager {
    cerrarSesion: () => boolean;
    registrarse: (usuario: User) => User;
    usuarioEnSesion: () => User;
    iniciarSesion(user: User) {
        console.log(user.username)
        return user
    }

}
class FriendRequest { }
class Group { }
class Place { }
//#endregion
