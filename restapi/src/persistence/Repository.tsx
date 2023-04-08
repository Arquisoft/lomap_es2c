import { UserImpl } from "../entities/User";
import UserSchema from "../entities/UserSchema"
import type { User } from "../facade";

const bcrypt = require("bcryptjs");
export class Repository {

    static async save(user: User, rondasDeEncriptacion: Number) {
        const { uri, mongoose } = Repository.getBD();

        await Repository.OpenConnection(uri, mongoose);

        const usuarioSchema = new UserSchema({
            username: user.username,
            webID: user.webID,
            password: await bcrypt.hash(user.password, rondasDeEncriptacion)
        });

        await usuarioSchema.save();

        await Repository.CloseConnection(mongoose)

    }

    static async findOne(user: User) {
        const { uri, mongoose } = Repository.getBD();

        await Repository.OpenConnection(uri, mongoose);

        let resultado: User;
        //try {
        resultado = await UserSchema.findOne({ username: user.username } ?? null) as User;
        //} catch {
        //  return new UserImpl("bderror", "", "");
        //}

        if (resultado == null) { return new UserImpl("notfound", "", "") };

        await Repository.CloseConnection(mongoose)

        return resultado
    }

    static async findOneAndUpdate(user: User) {

        const { uri, mongoose } = Repository.getBD();

        await Repository.OpenConnection(uri, mongoose);

        let resultado: User;

        resultado = await UserSchema.findOneAndUpdate({ username: user.username }, { webID: user.webID, description: user.description, img: user.img }, { new: true });


        if (resultado == null) { return new UserImpl("notfound", "", "") };

        await Repository.CloseConnection(mongoose)
        console.log(resultado)
        return resultado
    }

    static async findOneAndUpdatePassword(user: User) {

        const { uri, mongoose } = Repository.getBD();

        await Repository.OpenConnection(uri, mongoose);

        let resultado: User;

        resultado = await UserSchema.findOneAndUpdate({ username: user.username }, { password: user.password }, { new: true });


        await Repository.CloseConnection(mongoose)
        console.log(resultado)
        return resultado
    }







    public static async OpenConnection(uri: string, mongoose: any) {
        try {
            await mongoose.connect(uri);
        } catch {
            return new UserImpl("bderror", "", "");
        }
    }

    public static async CloseConnection(mongoose: any) {
        mongoose.connection.close();
    }

    public static getBD() {
        const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
        const mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        return { uri, mongoose };
    }
}