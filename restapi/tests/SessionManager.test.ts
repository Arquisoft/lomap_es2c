import { UserManager, UserManagerImpl } from '../src/controllers/UserManager';
import { UserImpl } from '../src/entities/User';
import { SesionManager } from "../src/facade";
import { UserSesionManager } from "../src/controllers/SessionManager";
var mongoose = require('mongoose');

describe('SessionManager', () => {
    let userManager: UserManager;
    let sessionManager: SesionManager;

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://admin:admin@prueba.bwoulkv.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    })

    beforeEach(() => {
        // Inicializar la instancia de UserManager y SessionManager antes de cada prueba
        userManager = new UserManagerImpl();
        sessionManager = new UserSesionManager();
    });

    afterEach(() => {
        // Limpiar cualquier estado después de cada prueba
    });

    afterAll(() => {
        mongoose.connection.close()
    });

    describe('iniciarSesion', () => {
        it('deberia retornar el usuario si las credenciales son correctas', async () => {
            const usuario = await sessionManager.iniciarSesion(new UserImpl("usertestn1", "usertestN1.", "", ""))
            expect(usuario.webID).toBe("webIdPrueba1");
        });
        it('deberia lanzar un error si la contraseña es incorrecta', async () => {

            let error = new Error("Error por defecto")
            try {
                await sessionManager.iniciarSesion(new UserImpl("usertestn1", "contrasenaincorrecta", "", ""))
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("Las credenciales no coinciden");
        });
        it('deberia lanzar un error si el usuario no existe', async () => {

            let error = new Error("Error por defecto")
            try {
                await sessionManager.iniciarSesion(new UserImpl("usernotexists", "contrasenaincorrecta", "", ""))
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("Las credenciales no coinciden");
        });
    });


    describe('registrarse', () => {
        it('deberia lanzar un error si el usuario ya existe', async () => {
            let error = new Error("Error por defecto")
            try {
                await sessionManager.registrarse(new UserImpl("usertestn1", "", "", ""))
            } catch (err) {
                error = err;
            }
            expect(error.message).toBe("El nombre de usuario que intenta introducir no esta disponible.");
        });
    });
});
