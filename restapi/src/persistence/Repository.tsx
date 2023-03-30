import { UserImpl } from "../entities/User";
import UserSchema from "../entities/UserSchema"
import type { User } from "../facade";

const bcrypt = require("bcryptjs");
export class Repository{

    static async save(user: User, rondasDeEncriptacion: Number){
        const { uri, mongoose } = Repository.getBD();
        
        Repository.OpenConnection(uri, mongoose);
        
        const usuarioSchema = new UserSchema({
            username: user.username,
            webID: user.webID,
            password: await bcrypt.hash(user.password, rondasDeEncriptacion)
        });

        await usuarioSchema.save();
        
        Repository.CloseConnection(mongoose)
        
    }

    static async findOne(user: User){
        const { uri, mongoose } = Repository.getBD();
        
        Repository.OpenConnection(uri, mongoose);
        
        let resultado: User;
        try {
            resultado = await UserSchema.findOne({ username: user.username }) as User;
        } catch {
            return new UserImpl("bderror", "", "");
        }
        
        if (resultado == null) { return new UserImpl("notfound", "", "") };
        
        Repository.CloseConnection(mongoose)
        
        return resultado
    }

    static async findOneAndUpdate(user: User) {
        
        const { uri, mongoose } = Repository.getBD();
        
        Repository.OpenConnection(uri, mongoose);
        
        let resultado: User;
        try {
            resultado = await UserSchema.findOneAndUpdate({ username: user.username }, { webID: user.webID });
        } catch {
            return new UserImpl("bderror", "", "");
        }
        
        if (resultado == null) { return new UserImpl("notfound", "", "") };
        
        Repository.CloseConnection(mongoose)
        
        return resultado
    }
    
    private static async OpenConnection(uri : string, mongoose: any){
        try {
            await mongoose.connect(uri);
        } catch {
            return new UserImpl("bderror", "", "");
        }
    }

    private static  async CloseConnection(mongoose: any){
        mongoose.connection.close();
    }
    
    private static getBD() {
        const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
        const mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        return { uri, mongoose };
    }
}