export interface User {
  username: string;
  password: string;
  webID: string;
  img: string;
  description: string;
}

export interface Group {
  places: Place[];
  name: string;
}

export interface Place {
    latitude: string
    longitude: string
    nombre: string
    category: string
    description: string
    comments: Comment[]
    images: Image[]
    reviewScore: string
    date: string
}

export interface Comment {
  author: string;
  comment: string;
  date: string;
}

export interface Image {
    author: string
    url: string
}

export type User2 = {
  name: string;
  email: string;
};

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
  user: User;
  groups: Group[];
}

export interface FriendRequest {
  receiver: string;
  sender: string;
  status: number;
}
export interface Group {}
export interface Place {}

export type MarkerData = {
  position: [number, number];
  name: string;
  type: string;
  iconUrl: string;
  category: string;
};
