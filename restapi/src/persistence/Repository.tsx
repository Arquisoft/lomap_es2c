import UserSchema from "../entities/UserSchema"
import type { User } from "../facade";

const bcrypt = require("bcryptjs");
export class Repository {

    static async save(user: User, rondasDeEncriptacion: Number) {

        const usuarioSchema = new UserSchema({
            username: user.username,
            webID: user.webID,
            password: await bcrypt.hash(user.password, rondasDeEncriptacion)
        });

        await usuarioSchema.save();

    }

    static async findOne(user: User) {

        let resultado: User;
        resultado = await UserSchema.findOne({ username: user.username } ?? null) as User;

        return resultado
    }

    static async findOneAndUpdate(user: User) {

        let resultado: User;
        try{
        resultado = await UserSchema.findOneAndUpdate({ username: user.username }, { webID: user.webID, description: user.description, img: user.img }, { new: true });
        }catch{
            throw new Error("Error al conectarse con la base de datos.")
        }

        return resultado
    }

    static async findOneAndUpdatePassword(user: User) {


        let resultado: User;

        resultado = await UserSchema.findOneAndUpdate({ username: user.username }, { password: user.password }, { new: true });

        return resultado
    }

}