import { User } from "../facade";
import { FriendRequest } from "../entities/FriendRequest";
import FriendshipSchema from "../entities/FriendshipSchema";
import UserSchema from "../entities/UserSchema";



export interface FriendManager {
    listarAmigos: (user: User) => Promise<User[]>;
    enviarSolicitud: (de: User, a: User) => Promise<FriendRequest>;
    listarSolicitudes: (user: User) => Promise<FriendRequest[]>;
    actualizarSolicitud: (solicitud: FriendRequest, status: number) => Promise<FriendRequest>;
    eliminarAmigo: (user: User, friend: User) => Promise<Boolean>;
}

export class FriendManagerImpl implements FriendManager {
    public static pendiente = 0;
    public static rechazado = -1;
    public static aceptado = 1;

    async listarAmigos(user: User): Promise<User[]> {
        let ret: User[] = [];
        try {
            let resultado = await FriendshipSchema.find({ sender: user.username, status: FriendManagerImpl.aceptado }, { receiver: 1, _id: 0 }) as FriendRequest[];
            let resultado2 = await FriendshipSchema.find({ receiver: user.username, status: FriendManagerImpl.aceptado }, { sender: 1, _id: 0 }) as FriendRequest[];
            let resultadoFinal = resultado.concat(resultado2)

            let amigosString = [];
            for (let i = 0; i < resultadoFinal.length; i++) {
                if (resultadoFinal[i].sender == undefined) {
                    amigosString.push(resultadoFinal[i].receiver)
                }
                else {
                    amigosString.push(resultadoFinal[i].sender)
                }
            }

            for (let i = 0; i < amigosString.length; i++) {
                let user = await UserSchema.findOne({ username: amigosString[i] }, { _id: 0, __v: 0 }) as User;
                ret.push(user);
            }
        }
        catch (e: any) {
            throw new Error("Fallo listando los amigos")
        }
        return ret;
    }

    async enviarSolicitud(de: User, a: User): Promise<FriendRequest> {
        let cond = await FriendshipSchema.exists({
            sender: new String(de.username),
            receiver: new String(a.username)
        });
        let cond2 = await FriendshipSchema.exists({
            sender: new String(a.username),
            receiver: new String(de.username)
        });
        if (cond || cond2) {
            throw new Error("La solicitud de amistad ya existe")
        }
        try {
            let sender = await UserSchema.exists({ username: de.username })
            let receiver = await UserSchema.exists({ username: a.username })

            if (!sender || !receiver) throw new Error("Uno o ambos de los usuarios de la solicitud no existen.");
            const friendShipSchema = new FriendshipSchema({
                sender: new String(de.username),
                receiver: new String(a.username),
                status: FriendManagerImpl.pendiente
            });
            await friendShipSchema.save();
        }
        catch (e: any) {
            throw new Error("Fallo enviando la solicitud de amistad")
        }
        return new FriendRequest(de.username, a.username, FriendManagerImpl.pendiente);
    }

    async actualizarSolicitud(solicitud: FriendRequest, status: number): Promise<FriendRequest> {
        solicitud.status = status;
        let resultado;
        try {
            resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: solicitud.status }) as FriendRequest;
        }
        catch (e: any) {
            throw new Error("Fallo actualizando la solicitud de amistad")
        }
        if (resultado == null) throw new Error("No se ha encontrado la solicitud de amistad.")
        return resultado;
    }

    async listarSolicitudes(user: User): Promise<FriendRequest[]> {
        let resultado;
        let userExists = await UserSchema.exists({ username: user.username })
        if (!userExists) throw new Error("El usuario no existe");
        try {
            resultado = await FriendshipSchema.find({ receiver: user.username, status: FriendManagerImpl.pendiente }) as FriendRequest[];
        }
        catch (e: any) {
            throw new Error("Fallo listando las solicitudes de amistad")
        }
        return resultado;
    }
    async eliminarAmigo(amigo1: User, amigo2: User): Promise<boolean> {
        try {
            await FriendshipSchema.deleteOne({ sender: amigo1.username, receiver: amigo2.username, status: FriendManagerImpl.aceptado });
            await FriendshipSchema.deleteOne({ sender: amigo2.username, receiver: amigo1.username, status: FriendManagerImpl.aceptado });
        }
        catch (e: any) {
            throw new Error("Fallo eliminando el amigo")
        }
        return true;
    }
}
//let a = new FriendManagerImpl();
//a.enviarSolicitud(new User("Juan", "", ""), new User("Adri", "", ""))
//console.log("hola");
//let u1 = new UserImpl("security", "", "", "");
//let u2 = new UserImpl("security3", "", "", "")
//let u3=new UserImpl("test3","","","");
//let u4=new UserImpl("test4","","","")

//let a = new FriendManagerImpl();

//a.enviarSolicitud(u1,u2).then(c=>console.log(c));
//a.actualizarSolicitud(new FriendRequest(u1,u2,0),1).then(c=>console.log(c));
//let b=a.listarSolicitudes(u1).then(c=>console.log(c));

//a.listarAmigos(u2).then(c => console.log(c));
//a.listarAmigos(u1).then(c=>console.log(c));
//enviar solicitud funciona
//aceptar solicitud funciona
//rechazar solicitud funciona
//listar funciona falta convertir a friend Requests