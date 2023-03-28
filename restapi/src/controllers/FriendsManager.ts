import { User } from "../facade";
import { FriendRequest } from "../entities/FriendRequest";
import FriendshipSchema from "../entities/FriendshipSchema";
import UserSchema from "../entities/UserSchema";


export interface FriendManager {
    listarAmigos: (user: User) => Promise<User[]>;
    enviarSolicitud: (de: User, a: User) => Promise<FriendRequest>;
    aceptarSolicitud: (solicitud: FriendRequest) => Promise<FriendRequest>;
    rechazarSolicitud: (solicitud: FriendRequest) => Promise<FriendRequest>;
    listarSolicitudes: (user: User) => Promise<FriendRequest[]>;
}

export class FriendManagerImpl implements FriendManager {

    async listarAmigos(user: User): Promise<User[]> {
        let resultado = await FriendshipSchema.find({ sender: user.username, status: 1 }, { receiver: 1, _id: 0 });
        let resultado2 = await FriendshipSchema.find({ receiver: user.username, status: 1 }, { sender: 1, _id: 0 });
        let ret: User[] = [];
        for (let i = 0; i < resultado.length; i++) {
            let user2 = await UserSchema.findOne({ username: resultado[i].receiver }, { webID: 1, username: 1, password: 1 }) as User;
            ret.push(user2)
        }
        for (let i = 0; i < resultado2.length; i++) {
            let user2 = await UserSchema.findOne({ username: resultado2[i].sender }, { webID: 1, username: 1, password: 1 }) as User;
            ret.push(user2)
        }
        return ret;
    }

    async enviarSolicitud(de: User, a: User): Promise<FriendRequest> {

        const userSchema = new FriendshipSchema({
            sender: de.username,
            receiver: a.username,
            status: 0
        });

        await userSchema.save();


        return new FriendRequest(de, a, 0);
    }
    async aceptarSolicitud(solicitud: FriendRequest): Promise<FriendRequest> {

        solicitud.status = 1;

        const resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: 1 }) as FriendRequest;


        return resultado;



    }
    async rechazarSolicitud(solicitud: FriendRequest): Promise<FriendRequest> {
        solicitud.status = -1;

        const resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: 1 }) as FriendRequest;


        return resultado;

    }
    async listarSolicitudes(user: User): Promise<FriendRequest[]> {

        let resultado = await UserSchema.find({ sender: user.username, status: 0 }) as FriendRequest[];


        return resultado;

    }


}
//let a = new FriendManagerImpl();
//a.enviarSolicitud(new User("Juan", "", ""), new User("Adri", "", ""))
//console.log("hola");