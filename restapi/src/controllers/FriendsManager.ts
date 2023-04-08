import { User } from "../facade";
import { FriendRequest } from "../entities/FriendRequest";
import FriendshipSchema from "../entities/FriendshipSchema";
import UserSchema from "../entities/UserSchema";
import { UserImpl } from "../entities/User";
import mongoose from "mongoose";


export interface FriendManager {
    listarAmigos: (user: User) => Promise<User[]>;
    enviarSolicitud: (de: User, a: User) => Promise<FriendRequest>;
    aceptarSolicitud: (solicitud: FriendRequest) => Promise<FriendRequest>;
    rechazarSolicitud: (solicitud: FriendRequest) => Promise<FriendRequest>;
    listarSolicitudes: (user: User) => Promise<FriendRequest[]>;
    actualizarSolicitud: (solicitud: FriendRequest, status: number) => Promise<FriendRequest>;
    eliminarAmigo: (amigo1:User,amigo2:User) => Promise<Boolean>;
}

export class FriendManagerImpl implements FriendManager {
    public static pendiente = 0;
    public static rechazado = -1;
    public static aceptado = 1;

    async listarAmigos(user: User): Promise<User[]> {

        const { uri, mongoose } = FriendManagerImpl.getBD();
        let ret: User[] = [];
        try{
        await FriendManagerImpl.OpenConnection(uri, mongoose);

        let resultado = await FriendshipSchema.find({ sender: user.username, status: FriendManagerImpl.aceptado }, { receiver: 1, _id: 0 }) as FriendRequest[];
        let resultado2 = await FriendshipSchema.find({ receiver: user.username, status: FriendManagerImpl.aceptado }, { sender: 1, _id: 0 }) as FriendRequest[];

        await FriendManagerImpl.CloseConnection(mongoose)
        let ret: User[] = [];



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

        await FriendManagerImpl.OpenConnection(uri, mongoose);

        for (let i = 0; i < amigosString.length; i++) {
            let user = await UserSchema.findOne({ username: amigosString[i] }, { _id: 0, __v: 0 }) as User;
            if(user!=null){user.password="";}
            ret.push(user);
        }
            await FriendManagerImpl.CloseConnection(mongoose)
            console.log(ret);
            return ret;
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }

    }

    async enviarSolicitud(de: User, a: User): Promise<FriendRequest> {
    console.log("añadiendo amigo")
        let cond=null;
        const { uri, mongoose } = FriendManagerImpl.getBD();
        try{
        await FriendManagerImpl.OpenConnection(uri, mongoose);

        cond=await FriendshipSchema.exists({
            sender: new String(de.username),
            receiver: new String(a.username)
            }
        );
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }
        console.log(cond)
        if (cond!=null){
            throw new Error("La solicitud de amistas/amistad ya existe")
            return null
        }

        try{

        const userSchema = new FriendshipSchema({
            sender: new String(de.username),
            receiver: new String(a.username),
            status: FriendManagerImpl.pendiente
        });
        await userSchema.save();
        await FriendManagerImpl.CloseConnection(mongoose);
        return new FriendRequest(de.username, a.username, FriendManagerImpl.pendiente);
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }

    }

    async actualizarSolicitud (solicitud: FriendRequest, status: number): Promise<FriendRequest> {

        const { uri, mongoose } = FriendManagerImpl.getBD();
        let resultado= null
        try{
        await FriendManagerImpl.OpenConnection(uri, mongoose);

        solicitud.status = status;
         resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver, status: 0 }, { status: solicitud.status }) as FriendRequest;
            await FriendManagerImpl.CloseConnection(mongoose)
            return resultado;
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }

    }

    async aceptarSolicitud(solicitud: FriendRequest): Promise<FriendRequest> {
        const { uri, mongoose } = FriendManagerImpl.getBD();
        let resultado= null
        try{
        await FriendManagerImpl.OpenConnection(uri, mongoose);

         resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: FriendManagerImpl.aceptado }) as FriendRequest;
            await FriendManagerImpl.CloseConnection(mongoose)
            return resultado;
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }

    }
    async rechazarSolicitud(solicitud: FriendRequest): Promise<FriendRequest> {
        const { uri, mongoose } = FriendManagerImpl.getBD();
        let resultado=null
        try{
        await FriendManagerImpl.OpenConnection(uri, mongoose);

         resultado = await FriendshipSchema.findOneAndUpdate({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: FriendManagerImpl.rechazado }) as FriendRequest;
            await FriendManagerImpl.CloseConnection(mongoose)
            return resultado;
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }


    }

    async eliminarAmigo(amigo1:User,amigo2:User): Promise<boolean> {
        const { uri, mongoose } = FriendManagerImpl.getBD();
        let resultado1=null
        let resultado2=null
        try{
        await FriendManagerImpl.OpenConnection(uri, mongoose);

        resultado1 = await FriendshipSchema.deleteMany({ sender: amigo1.username, receiver: amigo2.username, status: FriendManagerImpl.aceptado });
        resultado2 = await FriendshipSchema.deleteMany({ sender: amigo2.username, receiver: amigo1.username, status: FriendManagerImpl.aceptado });
            console.log(resultado1)
            console.log(resultado2)
            await FriendManagerImpl.CloseConnection(mongoose)
            return true;
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }

    }

    async listarSolicitudes(user: User): Promise<FriendRequest[]> {

        const { uri, mongoose } = FriendManagerImpl.getBD();
        let resultado=null
        try{
        await FriendManagerImpl.OpenConnection(uri, mongoose);

         resultado = await FriendshipSchema.find({ receiver: user.username, status: FriendManagerImpl.pendiente }) as FriendRequest[];

        await FriendManagerImpl.CloseConnection(mongoose)
            return resultado;
        }catch{
            throw new Error("Error al conectarse con la base de datos")
        }

    }


    private static getBD() {
        const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
        const mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        return { uri, mongoose };
    }
    private static async OpenConnection(uri: string, mongoose: any){
        try {
            await mongoose.connect(uri);
        }catch{
        throw new Error("Error al conectarse con la base de datos")
        }
    }

    private static async CloseConnection(mongoose: any) {
        mongoose.connection.close();
    }
}
//let a = new FriendManagerImpl();
//a.enviarSolicitud(new User("Juan", "", ""), new User("Adri", "", ""))
//console.log("hola");
//let u1 = new UserImpl("testmalodddd", "", "", "");
//let u2 = new UserImpl("testnochedfg", "", "", "")
//let u3=new UserImpl("test3","","","");
//let u4=new UserImpl("test4","","","")

//let a = new FriendManagerImpl();
//a.eliminarAmigo(u1,u2).then(c=>console.log(c));
//a.enviarSolicitud(u1,u2).then(c=>console.log(c));
//a.actualizarSolicitud(new FriendRequest(u1.username,u2.username,0),1).then(c=>console.log(c));
//let b=a.listarSolicitudes(u2).then(c=>console.log(c));

//a.listarAmigos(u2).then(c => console.log(c));
//a.listarAmigos(u1).then(c=>console.log(c));
//enviar solicitud funciona
//aceptar solicitud funciona
//rechazar solicitud funciona
//listar funciona falta convertir a friend Requests

