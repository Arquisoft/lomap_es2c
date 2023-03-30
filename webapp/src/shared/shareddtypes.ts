export interface User {
    username: String
    password: String
    webID: String
}

export interface Group {
    places: Place[]
    nombre: String
}

export interface Place {
    latitude: String
    longitud: String
    nombre: String
}

export type User2 = {
    name: string;
    email: string;
}

export interface FriendManager {
    listarAmigos: (user: User) => User[];
    enviarSolicitud: (de: User, a: User) => FriendRequest;
    aceptarSolicitud: (solicitud: FriendRequest) => FriendRequest;
    rechazarSolicitud: (solicitud: FriendRequest) => FriendRequest;
    listarSolicitudes: (user: User) => FriendRequest[];
}

export interface MapManager {
    verMapaDe: (user: User) => Group[];
    añadirLugarAGrupo: (lugar: Place, grupo: Group) => Group;
    crearGrupo: (nombre: Group) => Group;
    eliminarGrupo: (grupo: Group) => boolean;
    eliminarLugarDeGrupo: (lugar: Place, grupo: Group) => Group;
    aplicarFiltro: (grupo: Group, filtro: string) => Place[];
    editarGrupo: (grupo: Group) => Group;
    mostrarGrupo: (grupo: Group) => Place[];
}

export interface SesionManager {
    cerrarSesion: () => boolean;
    iniciarSesion: (usuario: User) => User;
    registrarse: (usuario: User) => User;
    usuarioEnSesion: () => User;
}

export interface UserManager {
    modificarPerfil: (user: User) => Promise<User>;
    listarDetalles: (user: User) => Promise<User>;
}

export interface Friend {
    user: User,
    groups: Group[],
}

export interface FriendRequest {
    receiver: User,
    sender: User,
    status: number,
}
export interface Group { }
export interface Place { }
