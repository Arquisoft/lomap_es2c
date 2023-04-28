import { UserManager, UserManagerImpl } from '../src/controllers/UserManager';
import { UserImpl } from '../src/entities/User';
import User from "../src/entities/UserSchema";
import { SesionManager } from "../src/facade";
import { UserSesionManager } from "../src/controllers/SessionManager";
import { FriendManager, FriendManagerImpl } from "../src/controllers/FriendManager";
import { FriendRequest } from "../src/entities/FriendRequest";
import mongoose from "mongoose";
import { ftruncate } from "fs";
import { response } from "express";

describe('FriendsManager', () => {
    let userManager: UserManager;
    let friendManager: FriendManager;

    beforeEach(() => {
        // Inicializar la instancia de UserManager y SessionManager antes de cada prueba
        require("../src/persistence/DataBase")
        userManager = new UserManagerImpl();
        friendManager = new FriendManagerImpl();
    });

    afterEach(() => {

    });

    afterAll(() => {
        mongoose.connection.close()
    });

    describe('listarAmigos', () => {
        it('deberia devolver una lista vacía al pedir amigos de un usuario inexistente', async () => {
            const amigos = await friendManager.listarAmigos(new UserImpl("usernotexists", "", "", "", ""))
            expect(amigos.length).toBe(0);
        });
        it('deberia devolver 2 amigos para testn1 que tiene dos amigos', async () => {
            const amigos = await friendManager.listarAmigos(new UserImpl("usertestn1", "", "", ""))
            expect(amigos.length).toBe(2);
        });
        it('deberia devolver 1 amigo para testn2 que tiene un amigo', async () => {
            const amigos = await friendManager.listarAmigos(new UserImpl("usertestn2", "", "", ""))
            expect(amigos.length).toBe(1);
        });
        it('deberia devolver 0 amigos para testn4 que tiene cero amigos', async () => {
            const amigos = await friendManager.listarAmigos(new UserImpl("usertestn4", "", "", ""))
            expect(amigos.length).toBe(0);
        });

    });


    describe('enviarSolicitud', () => {
        it('deberia lanzar un error si la amistad ya existe', async () => {
            let error = new Error("Error por defecto")
            try {
                await friendManager.enviarSolicitud(new UserImpl("usertestn1", "", "", ""), new UserImpl("usertestn2", "", "", ""))
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("La solicitud de amistad ya existe");
        });
    });

    describe('actualizarSolicitud', () => {
        it('deberia lanzar un error si la amistad no existe', async () => {
            let error = new Error("Error por defecto")
            const fr = new FriendRequest("usernotexists1", "usernotexists1", 0)
            try {
                await friendManager.actualizarSolicitud(fr, 0)
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("No se ha encontrado la solicitud de amistad.");
        });
        it('deberia devolver la friend request actualizada si todo es correcto', async () => {

            const fr = new FriendRequest("usertestn1", "usertestn2", 1)
            const res = await friendManager.actualizarSolicitud(fr, 1)
            expect(res.status).toBe("1");
            expect(res.sender).toBe("usertestn1");
            expect(res.receiver).toBe("usertestn2");
        });
    });

    describe('listarSolicitudes', () => {
        it('deberia lanzar un error si no existe', async () => {
            let error = new Error("Error por defecto")
            const fr = new FriendRequest("usernotexists1", "usernotexists1", 0)
            try {
                await friendManager.listarSolicitudes(new UserImpl("usernotexists", "", "", ""))
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("El usuario no existe");

        });
        it('deberia devolver una lista con una solicitud para un usuario con una solicitud', async () => {
            const amigos = await friendManager.listarSolicitudes(new UserImpl("usertestn1", "", "", ""))
            expect(amigos.length).toBe(1);
        });
        it('deberia devolver una lista con 0 solicitudes para un usuario con cero solicitudes', async () => {
            const amigos = await friendManager.listarSolicitudes(new UserImpl("usertestn2", "", "", ""))
            expect(amigos.length).toBe(0);
        });
    });
    describe('eliminarAmigo', () => {
        it('deberia eliminar el amigo si existe', async () => {
            let user1 = new UserImpl("usertestn1", "", "", "")
            let user2 = new UserImpl("usertestn2", "", "", "")
            const amigos1A = await friendManager.listarAmigos(user1);
            const amigos2A = await friendManager.listarAmigos(user2);
            await friendManager.eliminarAmigo(user1, user2)
            const amigos1B = await friendManager.listarAmigos(user1);
            const amigos2B = await friendManager.listarAmigos(user2);
            expect(amigos1B.length).toBe(amigos1A.length - 1)
            expect(amigos2B.length).toBe(amigos2A.length - 1)
            await friendManager.enviarSolicitud(user1, user2)
            await friendManager.actualizarSolicitud(new FriendRequest(user1.username, user2.username, 0), 1)
        });
    });
});
