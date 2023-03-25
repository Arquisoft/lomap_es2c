import { MapManagerImpl } from './controllers/MapManager';
import { UserSesionManager } from './controllers/SessionManager'
import { UserManager } from './controllers/UserManager'
import { Place } from './entities/Place';

export { FactoryLoMap, Place };
export type { User, SesionManager, MapManager, PODManager, Group };

interface SesionManager {
    cerrarSesion: () => boolean;
    iniciarSesion: (usuario: User) => Promise<User>;
    registrarse: (usuario: User) => Promise<User>;
    usuarioEnSesion: () => User;
}

//TODOS LOS BOOLEAN QUE DEVUELVEN LOS MÉTODOS SON ÚNICAMENTE PARA NOTIFICAR EL RESULTADO DE LA OPERACION
//ES INTERCAMBIABLE POR INT O STRING CON UN CODIGO DEFINIDO

//#region FACADE

interface MapManager {
    verMapaDe: (user: User) => Promise<Group[]>;
    añadirLugarAGrupo: (lugar: Place, grupo: Group) => Group;
    crearGrupo: (nombre: String) => Group;
    eliminarGrupo: (grupo: Group) => boolean;
    eliminarLugarDeGrupo: (lugar: Place, grupo: Group) => Group;
    aplicarFiltro: (grupo: Group, filtro: string) => Place[];
    editarGrupo: (grupo: Group) => Group;
    mostrarGrupo: (grupo: Group) => Place[];
}

interface FriendManager {
    listarAmigos: (user: User) => User[];
    enviarSolicitud: (de: User, a: User) => FriendRequest;
    aceptarSolicitud: (solicitud: FriendRequest) => FriendRequest;
    rechazarSolicitud: (solicitud: FriendRequest) => FriendRequest;
    listarSolicitudes: (user: User) => FriendRequest[];
}

//#endregion

interface PODManager {
    guardarCoord: (WebID: String, Coor: String) => null;
    getCoordenadas: (WebID: String) => Place[];
    guardarGrupo: (WebID: String, Group: Group) => null;
    getGrupos: (WebID: String) => Group[];
}

//#region INTERFACES AUXILIARES

class FactoryLoMap {
    //static getMapManager: () => MapManager;
    static getUserManager: () => UserManager;
    //static getFriendManager: () => FriendManager;

    static getSesionManager(): SesionManager {
        return new UserSesionManager();
    }

    static getMapManager(): MapManager {
        return new MapManagerImpl();
    }
}
//#endregion

//#region CLASES DE EJEMPLO PARA FUNCIONAR
class FriendRequest { }
// class Group { }
// class Place { }
//#endregion

interface User {
    username: String
    password: String
    webID: String
}

interface Group{
    name: String
    places: Place[]
}

