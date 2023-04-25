import { UserManager, UserManagerImpl } from '../src/controllers/UserManager';
import { UserImpl } from '../src/entities/User';
import User from "../src/entities/UserSchema";
import mongoose from "mongoose";

describe('UserManager', () => {
    let userManager: UserManager;

    beforeEach(() => {
        // Inicializar la instancia de UserManager antes de cada prueba
        require("../src/persistence/DataBase")
        userManager = new UserManagerImpl();
    });

    afterEach(() => {
        // Limpiar cualquier estado después de cada prueba
    });

    afterAll(() => {
        mongoose.connection.close()
    });

    describe('listarDetalles', () => {
        it('deberia devolver los detalles del usuario', async () => {
            const usuario = await userManager.listarDetalles(new UserImpl("usertestn1", "", "", ""))
            expect(usuario.webID).toBe("webIdPrueba1");

        });

        it('debería devolver la contraseña vacia', async () => {
            const usuario = await userManager.listarDetalles(new UserImpl("usertestn1", "", "", ""))
            expect(usuario.password).toBe("");
        });

        it('debería lanzar un error si el usuario no existe', async () => {
            let error = new Error("Error por defecto")
            try {
                await userManager.listarDetalles(new UserImpl("usertestnotexists", "", "", ""))
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("El usuario no existe.");
        });
        it('deberia devolver la descripcion de un usuario con descripcion', async () => {
            const usuario = await userManager.listarDetalles(new UserImpl("usertestn1", "", "", ""))
            expect(usuario.description).toBe("descripcionprueba1");
        });
        it('deberia devolver los detalles de un usuario sin descripcion, descripcion=undefined', async () => {
            const usuario = await userManager.listarDetalles(new UserImpl("usertestn2", "", "", ""))
            expect(usuario.description).toBe(undefined);
        });
    });

    describe('modificarPerfil', () => {
        it('debería modificar correctamente el perfil de un usuario existente', async () => {
            //se modifica
            const usuario = await userManager.modificarPerfil(new UserImpl("usertestn3", "", "webid cambiado", ""))
            expect(usuario.webID).toBe("webid cambiado");
            //se comprueba
            const usuario2 = await userManager.listarDetalles(new UserImpl("usertestn3", "", "", ""))
            expect(usuario2.webID).toBe("webid cambiado");
            //se deja como estaba para poder volver a ejecutar la prueba
            const usuario3 = await userManager.modificarPerfil(new UserImpl("usertestn3", "", "webIdPrueba3", ""))
            expect(usuario3.webID).toBe("webIdPrueba3");
            //se vuelve a comprobar
            const usuario4 = await userManager.listarDetalles(new UserImpl("usertestn3", "", "", ""))
            expect(usuario4.webID).toBe("webIdPrueba3");

        });

        it('debería lanzar un error si el usuario no existe', async () => {
            let error = new Error("Error por defecto")
            try {
                await userManager.modificarPerfil(new UserImpl("usertestnotexists", "", "", ""))
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("Usuario no encontrado.");
        });
        it('debería devolver la contraseña vacia', async () => {
            //se modifica
            const usuario = await userManager.modificarPerfil(new UserImpl("usertestn3", "", "webid cambiado", ""))
            expect(usuario.password).toBe("");

            //se deja como estaba para poder volver a ejecutar la prueba
            const usuario2 = await userManager.modificarPerfil(new UserImpl("usertestn3", "", "webIdPrueba3", ""))
            expect(usuario2.password).toBe("");


        });



    });
    describe('modificarContrasena', () => {
        it('debería lanzar un error si el usuario no existe', async () => {
            let error = new Error("Error por defecto")
            try {
                await userManager.modificarContrasena(new UserImpl("usertestnotexists", "", "", ""), "", "")
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("El usuario no existe.");

        });
        it('debería lanzar un error si la contraseña antigua no coincide', async () => {
            let error = new Error("Error por defecto")
            try {
                await userManager.modificarContrasena(new UserImpl("usertestn4", "", "", ""), "contrasenaincorrecta", "usertestN4.")
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("La contraseña antigua era incorrecta");

        });

        it('no deberia lanzar ningun error si cambia la contraseña satisfactoriamente (se cambia por la misma por ser un test)', async () => {
            let error = new Error("Error por defecto")
            try {
                await userManager.modificarContrasena(new UserImpl("usertestn4", "", "", ""), "usertestN4.", "usertestN4.")
            } catch (err) {
                expect(false).toBe(true);
            }
            expect(true).toBe(true);

        });





    });

});
