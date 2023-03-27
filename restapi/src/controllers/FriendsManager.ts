import {User} from "../facade";
import {FriendRequest} from "../entities/FriendRequest";


interface FriendManager {
    listarAmigos: (user: User) => Promise<User[]>;
    enviarSolicitud: (de: User, a: User) => Promise<FriendRequest>;
    aceptarSolicitud: (solicitud: FriendRequest) => Promise<FriendRequest>;
    rechazarSolicitud: (solicitud: FriendRequest) => Promise<FriendRequest>;
    listarSolicitudes: (user: User) => Promise<FriendRequest[]>;
}

class FriendManagerImpl implements FriendManager {
    async listarAmigos(user: User): Promise<User[]> {


        const {uri, mongoose} = this.getBD();

        await mongoose.connect(uri);

        const userSchema = new mongoose.Schema({
            user1: String,
            user2: String,
        });

        let usuario = mongoose.model('friendships', userSchema)


        let resultado = await usuario.find({ user1: user.username });

        console.log(resultado);

        mongoose.connection.close();

        return null;

    }

    private getBD() {
        const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
        const mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        return {uri, mongoose};
    }

    async enviarSolicitud(de: User, a: User): Promise<FriendRequest> {
        const {uri, mongoose} = this.getBD();

        await mongoose.connect(uri);

        const userSchema = new mongoose.Schema({
            sender: de.username,
            receiver: a.username,
            status: "pendiente"
        });
        const usuario = mongoose.model('friendrequests', userSchema);

        usuario.save();



        return new FriendRequest(de,a,false);
    }
    async aceptarSolicitud(solicitud: FriendRequest): Promise<FriendRequest> {

        const {uri, mongoose} = this.getBD();
        await mongoose.connect(uri);

        solicitud.status=true;

        const userSchema = new mongoose.Schema({
            sender: String,
            receiver: String,
            status: String
        });

        const usuario = mongoose.model('friendrequests', userSchema);

        const resultado = await usuario.updateOne({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: "aceptada" });
        console.log(resultado.modifiedCount);



        const aSchema = new mongoose.Schema({
            user1: solicitud.sender,
            user2: solicitud.receiver
        });

        let b = mongoose.model('friendships')
        b.save();

        let cSchema = new mongoose.Schema({
            user1: solicitud.receiver,
            user2: solicitud.sender
        });

        let c = mongoose.model('friendships')
        c.save();


        mongoose.connection.close();

        return solicitud;



    }
    async rechazarSolicitud(solicitud: FriendRequest): Promise<FriendRequest> {
        const {uri, mongoose} = this.getBD();
        await mongoose.connect(uri);

        solicitud.status=false;

        const userSchema = new mongoose.Schema({
            sender: String,
            receiver: String,
            status: String
        });

        const usuario = mongoose.model('friendrequests', userSchema);

        const resultado = await usuario.updateOne({ sender: solicitud.sender, receiver: solicitud.receiver }, { status: "rechazada" });
        return solicitud;

    }
    async listarSolicitudes(user: User): Promise<FriendRequest[]> {

        const {uri, mongoose} = this.getBD();
        await mongoose.connect(uri);

        const userSchema = new mongoose.Schema({
            sender: String,
            receiver: String,
            status: String
        });

        let usuario = mongoose.model('friendrequests', userSchema)


        let resultado = await usuario.find({ receiver: user.username });

        console.log(resultado);

        mongoose.connection.close();

        return null;

    }


}
//let a = new FriendManagerImpl();
//a.enviarSolicitud(new User("Juan", "", ""), new User("Adri", "", ""))
console.log("hola");