import {UserManager, UserManagerImpl} from '../src/controllers/UserManager';
import { UserImpl } from '../src/entities/User';
import User from "../src/entities/UserSchema";
import {SesionManager} from "../src/facade";
import {UserSesionManager} from "../src/controllers/SessionManager";
import {FriendManager, FriendManagerImpl} from "../src/controllers/FriendManager";
import {FriendRequest} from "../src/entities/FriendRequest";

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
        // Limpiar cualquier estado después de cada prueba
    });

    afterAll(()=>{

    });

    describe('iniciarSesion', () => {
        it('deberia devolver una lista vacía al pedir amigos de un usuario inexistente', async () => {
            const amigos=await friendManager.listarAmigos(new UserImpl("usernotexists", "", "", ""))
            expect(amigos.length).toBe(0);
        });
        it('deberia devolver 2 amigos para testn1 que tiene dos amigos', async () => {
            const amigos=await friendManager.listarAmigos(new UserImpl("usertestn1", "", "", ""))
            expect(amigos.length).toBe(2);
        });
        it('deberia devolver 1 amigo para testn2 que tiene un amigo', async () => {
            const amigos=await friendManager.listarAmigos(new UserImpl("usertestn2", "", "", ""))
            expect(amigos.length).toBe(1);
        });
        it('deberia devolver 0 amigos para testn4 que tiene cero amigos', async () => {
            const amigos=await friendManager.listarAmigos(new UserImpl("usertestn4", "", "", ""))
            expect(amigos.length).toBe(0);
        });

    });


    describe('enviarSolicitud', () => {
        it('deberia lanzar un error si la amistad ya existe', async () => {
            let error=new Error("Error por defecto")
            try{
                await friendManager.enviarSolicitud(new UserImpl("usertestn1", "", "", ""),new UserImpl("usertestn2", "", "", ""))
            }catch(err){
                error=err;
            }
            expect(error.message).toBe("La solicitud de amistad ya existe");
        });
    });

    describe('actualizarSolicitud', () => {
        it('deberia lanzar un error si la amistad no existe', async () => {
            let error=new Error("Error por defecto")
            const fr= new FriendRequest("usernotexists1","usernotexists1",0)
            try{
                await friendManager.actualizarSolicitud(fr,0)
            }catch(err){
                error=err;
            }
            expect(error.message).toBe("la solicitud no existe");
        });
        it('deberia devolver la friend request actualizada si todo es correcto', async () => {

            const fr= new FriendRequest("usertestn1","usertestn2",1)
            const res=await friendManager.actualizarSolicitud(fr,1)
            expect(res.status).toBe("1");
            expect(res.sender).toBe("usertestn1");
            expect(res.receiver).toBe("usertestn2");
        });
    });

});
