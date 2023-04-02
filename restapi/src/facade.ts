import { FriendManagerImpl } from './controllers/FriendsManager';
import { UserSesionManager } from './controllers/SessionManager'
import { UserManager, UserManagerImpl } from './controllers/UserManager'
import { Place } from './entities/Place';
import { FriendManager } from './controllers/FriendsManager'
import { Session } from '@inrupt/solid-client-authn-browser';
import { MapManagerImpl } from './controllers/MapManager';

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
    crearGrupo: (nombre: string) => Group;
    eliminarGrupo: (grupo: Group) => boolean;
    eliminarLugarDeGrupo: (lugar: Place, grupo: Group) => Group;
    aplicarFiltro: (grupo: Group, filtro: string) => Place[];
    editarGrupo: (grupo: Group) => Group;
    mostrarGrupo: (grupo: Group) => Place[];
    añadirGrupo: (grupo: Group) => Promise<Group[]>;
}

//#endregion

export interface PODManager {
    savePlace: (session: Session, Place: Place) => Promise<void>;
    getPlaces: (session: Session) => Promise<Place[]>;
    saveGroup: (session: Session, Group: Group) => Promise<void>;
    getGroups: (session: Session) => Promise<Group[]>;
}

//#region INTERFACES AUXILIARES

export class FactoryLoMap {
    static getMapManager(): MapManager {
        return new MapManagerImpl(null);
    };

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
    username: String
    password: String
    webID: String
}

export interface Group {
    name: string
    places: Place[]
}

