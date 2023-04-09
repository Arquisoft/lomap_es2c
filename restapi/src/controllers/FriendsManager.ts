import { User } from "../facade";
import { FriendRequest } from "../entities/FriendRequest";
import FriendshipSchema from "../entities/FriendshipSchema";
import UserSchema from "../entities/UserSchema";
import { UserImpl } from "../entities/User";
import { Repository } from "../persistence/Repository";


export interface FriendManager {
    listarAmigos: (user: User) => Promise<User[]>;
    enviarSolicitud: (de: User, a: User) => Promise<FriendRequest>;
    aceptarSolicitud: (solicitud: FriendRequest) => Promise<FriendRequest>;
    rechazarSolicitud: (solicitud: FriendRequest) => Promise<FriendRequest>;
    listarSolicitudes: (user: User) => Promise<FriendRequest[]>;
    actualizarSolicitud: (solicitud: FriendRequest, status: number) => Promise<FriendRequest>;
    eliminarAmigo: (user: User, friend: User) => Promise<Boolean>;
}

export class FriendManagerImpl implements FriendManager {
    public static pendiente = 0;
    public static rechazado = -1;
    public static aceptado = 1;

    async listarAmigos(user: User): Promise<User[]> {
        const { uri, mongoose } = Repository.getBD();
        const session = await mongoose.startSession()
        let ret: User[] = [];
        await session.withTransaction(async () => {
            let resultado = await FriendshipSchema.find({ sender: user.username, status: FriendManagerImpl.aceptado }, { receiver: 1, _id: 0 }) as FriendRequest[];
            let resultado2 = await FriendshipSchema.find({ receiver: user.username, status: FriendManagerImpl.aceptado }, { sender: 1, _id: 0 }) as FriendRequest[];
            let resultadoFinal = resultado.concat(resultado2)

            let amigosString = [];
            for (let i = 0; i < resultadoFinal.length; i++) {
                if (resultadoFinal[i].sender == undefined) {
                    //console.log(resultadoFinal[i].receiver);
                    amigosString.push(resultadoFinal[i].receiver)
                }
                else {
                    //console.log(resultadoFinal[i].sender);
                    amigosString.push(resultadoFinal[i].sender)
                }
            }

            for (let i = 0; i < amigosString.length; i++) {
                let user = await UserSchema.findOne({ username: amigosString[i] }, { _id: 0, __v: 0 }) as User;
                ret.push(user);
            }
            await session.commitTransaction()
        }).catch((error: any) => {
            session.abortTransaccion();
        })
        return ret;
    }

    async enviarSolicitud(de: User, a: User): Promise<FriendRequest> {
        let cond = null;
        const { uri, mongoose } = FriendManagerImpl.getBD();
        const session = await mongoose.startSession()
        await session.withTransaction(async (): Promise<void> => {
            cond = await FriendshipSchema.exists({
                sender: new String(de.username),
                receiver: new String(a.username)
            }
            );

            if (cond != null) {
                throw new Error("La solicitud de amistas/amistad ya existe")
                return null
            }
            const userSchema = new FriendshipSchema({
                sender: new String(de.username),
                receiver: new String(a.username),
                status: FriendManagerImpl.pendiente
            });
            await userSchema.save();
            await session.commitTransaction()
        }).catch((error: any) => {
            session.abortTransaccion();
        })

        return new FriendRequest(de.username, a.username, FriendManagerImpl.pendiente);


    }

    async actualizarSolicitud(solicitud: FriendRequest, status: number): Promise<FriendRequest> {
        solicitud.status = status;
        const { uri, mongoose } = Repository.getBD();
        await Repository.OpenConnection(uri, mongoose)
        const resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver, status: 0 }, { status: solicitud.status }) as FriendRequest;
        await Repository.CloseConnection(mongoose)
        return resultado;
    }

    async aceptarSolicitud(solicitud: FriendRequest): Promise<FriendRequest> {
        const { uri, mongoose } = Repository.getBD();
        await Repository.OpenConnection(uri, mongoose)
        let resultado;
        try {
            resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: FriendManagerImpl.aceptado }) as FriendRequest;
        } finally {
            await Repository.CloseConnection(mongoose)
        }
        return resultado;
    }
    async rechazarSolicitud(solicitud: FriendRequest): Promise<FriendRequest> {
        const { uri, mongoose } = Repository.getBD();
        await Repository.OpenConnection(uri, mongoose)
        let resultado;
        try {
            resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: FriendManagerImpl.rechazado }) as FriendRequest;
        } finally {
            await Repository.CloseConnection(mongoose)
        }
        return resultado;

    }
    async listarSolicitudes(user: User): Promise<FriendRequest[]> {
        const { uri, mongoose } = Repository.getBD();
        await Repository.OpenConnection(uri, mongoose)
        let resultado;
        try {
            resultado = await FriendshipSchema.find({ receiver: user.username, status: FriendManagerImpl.pendiente }) as FriendRequest[];
        } finally {
            await Repository.CloseConnection(mongoose)
        }
        return resultado;
    }
    async eliminarAmigo(amigo1: User, amigo2: User): Promise<boolean> {
        const { uri, mongoose } = Repository.getBD();
        const session = await mongoose.startSession()
        let resultado1 = null
        let resultado2 = null
        await session.withTransaction(async () => {
            resultado1 = await FriendshipSchema.deleteMany({ sender: amigo1.username, receiver: amigo2.username, status: FriendManagerImpl.aceptado });
            resultado2 = await FriendshipSchema.deleteMany({ sender: amigo2.username, receiver: amigo1.username, status: FriendManagerImpl.aceptado });
            await session.commitTransaction();
        }).catch((error: any) => {
            session.abortTransaccion();
            throw new Error("Error al conectarse con la base de datos")
        })
        return true;
    }

    private static getBD() {
        const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
        const mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        return { uri, mongoose };
    }
    private async OpenConnection(uri: string, mongoose: any) {
        try {
            await mongoose.connect(uri);
        } catch {
            throw new Error("Error al conectarse con la base de datos")
        }
    }

    private static async CloseConnection(mongoose: any) {
        await mongoose.connection.close();
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