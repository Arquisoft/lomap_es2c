import mongoose from "mongoose";

export async function OpenConnection(uri: string, mongoose: any) {
    await mongoose.connect(uri).catch((e: any) => {
        throw new Error("Error al conectar a la BD: " + e)
    })
}

export async function CloseConnection(mongoose: any) {
    await mongoose.connection.close().catch((e: any) => {
        throw new Error("Error al cerrar BD: " + e)
    })
}

export async function getBD() {
    const uri = "mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority";
    const mongoose = require('mongoose');
    await mongoose.set('strictQuery', true).catch((e: any) => {
        throw new Error("Fallo de Juan: " + e)
    });
    await mongoose.set('debug', true).catch((e: any) => {
        throw new Error("Fallo de Juan: " + e)
    });
    return { uri, mongoose };
}

export async function findOne(schema: any, filter: any, options: any) {
    const { uri, mongoose } = await getBD();
    await OpenConnection(uri, mongoose);
    await schema.findOne(filter, options).catch((e: any) => {
        throw new Error("Fallo en el FindOne: " + e)
    })
}