import {User} from "../facade";
import mongoose, {Mongoose} from "mongoose";
import {UserImpl} from "../entities/User";
import UserSchema from "../entities/UserSchema";


module.exports = {
    mongoClient: null,
    app: null,
    init: function (mongoClient:Mongoose) {
        this.mongoClient = mongoClient;

    },
    findUser: async function (username: string) {

        const { uri, mongoose } = getBD();
        try {
            await mongoose.connect(uri);
        } catch {
            return new UserImpl("bderror", "", "");
        }

        let resultado: User;

        try {
            resultado = await UserSchema.findOne({ username: username }, { _id: 0, __v: 0 }) as User;
        } catch {
            throw new Error("Error al conectarse con la base de datos.")
        }

        if (resultado == null) {
            throw new Error("El usuario no existe.")
        }



        return resultado;

    },
    insertUser: async function (user:User) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'users';
            const usersCollection = database.collection(collectionName);
            const result = await usersCollection.insertOne(user);
            return result.insertedId;
        } catch (error) {
            throw (error);
        }
    }
};

function getBD() {
    const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
    const mongoose = require('mongoose');
    mongoose.set('strictQuery', true);
    return { uri, mongoose };
}