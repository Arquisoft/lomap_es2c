import { FriendManagerImpl } from './controllers/FriendsManager';
import { UserSesionManager } from './controllers/SessionManager'
import { UserManager, UserManagerImpl } from './controllers/UserManager'
import { Place } from './entities/Place';
import { FriendManager } from './controllers/FriendsManager'

export interface SesionManager {
    cerrarSesion: () => boolean;
    iniciarSesion: (usuario: User) => Promise<User>;
    registrarse: (usuario: User) => Promise<User>;
    usuarioEnSesion: () => User;
}

//TODOS LOS BOOLEAN QUE DEVUELVEN LOS MÉTODOS SON ÚNICAMENTE PARA NOTIFICAR EL RESULTADO DE LA OPERACION
//ES INTERCAMBIABLE POR INT O STRING CON UN CODIGO DEFINIDO

//#region FACADE

export interface MapManager {
    verMapaDe: (user: User) => Promise<Group[]>;
    añadirLugarAGrupo: (lugar: Place, grupo: Group) => Group;
    crearGrupo: (nombre: String) => Group;
    eliminarGrupo: (grupo: Group) => boolean;
    eliminarLugarDeGrupo: (lugar: Place, grupo: Group) => Group;
    aplicarFiltro: (grupo: Group, filtro: string) => Place[];
    editarGrupo: (grupo: Group) => Group;
    mostrarGrupo: (grupo: Group) => Place[];
}

//#endregion

export interface PODManager {
    guardarCoord: (WebID: String, Coor: String) => null;
    getCoordenadas: (WebID: String) => Place[];
    guardarGrupo: (WebID: String, Group: Group) => null;
    getGrupos: (WebID: String) => Group[];
}

//#region INTERFACES AUXILIARES

export class FactoryLoMap {
    static getMapManager: () => MapManager;

    static getFriendManager(): FriendManager {
        return new FriendManagerImpl();
    };

    static getSesionManager(): SesionManager {
        return new UserSesionManager();
    }

    static getUserManager(): UserManager {
        return new UserManagerImpl();
    }
}
//#endregion

//#region CLASES DE EJEMPLO PARA FUNCIONAR
class FriendRequest { }
// class Group { }
// class Place { }
//#endregion

export interface User {
    username: string
    password: string
    webID: string
    description: String
    img: String
}

export interface Group {
    name: string
    places: Place[]
}

