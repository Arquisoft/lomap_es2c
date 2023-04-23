import express, {Application, RequestHandler} from "express";
import bp from "body-parser";
import promBundle from "express-prom-bundle";
import { Server } from "http";
import request, { Response } from "supertest";
import apiUser from "../api";
import mongoose from "mongoose";
import {UserImpl} from "../src/entities/User";
import {FriendRequest} from "../src/entities/FriendRequest";
import {FriendManagerImpl} from "../src/controllers/FriendManager";
import FriendshipSchema from "../src/entities/FriendshipSchema";

var server: Server;

const app: Application = express();

beforeAll(async () => {
    require("../src/persistence/DataBase")
    const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
    app.use(metricsMiddleware);

    app.use(bp.json());

    app.use(bp.urlencoded({ extended: false }));

    app.use(apiUser);

    server = app.listen(5000);

});
afterAll(async () => {
    server.close();
    await mongoose.connection.close();
});

describe('test conexión con api ', () => {
     test('GET /',async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
    });
});

describe('/usermanager/find/username ', () => {
    test('usuario que existe',async () => {
        const response = await request(app).get('/usermanager/find/username?username=usertestn1');
        let user=JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(user.webID).toBe("webIdPrueba1");
        expect(user.description).toBe("descripcionprueba1");
    });
    test('usuario que no existe',async () => {
        const response = await request(app).get('/usermanager/find/username?username=usernotexists');
        expect(response.status).toBe(404);
    });
});

describe('/usermanager/edit ', () => {
    test('usuario que existe',async () => {

        let user=new UserImpl("usertestn1","","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/usermanager/edit').send({user: user });
        expect(response.status).toBe(200);

    });
    test('usuario que no existe',async () => {
        const response = await request(app).post('/usermanager/find/username?username=usernotexists');
        expect(response.status).toBe(404);
    });
});

describe('/sesionmanager/signup ', () => {
    test('usuario que ya existe',async () => {

        let user=new UserImpl("usertestn1","","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/sesionmanager/signup').send({user: user });
        expect(response.status).toBe(404);

    });
});

describe('/sesionmanager/login ', () => {

    test('usuario que existe',async () => {

        let user=new UserImpl("usertestn1","usertestN1.","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/sesionmanager/login').send({user: user });
        expect(response.status).toBe(200);

    });

    test('contraseña erronea',async () => {

        let user=new UserImpl("usertestn1","wrongpassword","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/sesionmanager/login').send({user: user });
        expect(response.status).toBe(404);

    });

    test('usuario que no existe',async () => {

        let user=new UserImpl("usernotexists","wrongpassword","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/sesionmanager/login').send({user: user });
        expect(response.status).toBe(404);

    });
});

describe('/friendmanager/updaterequest/:status', () => {

    test('friend request existe',async () => {

        let fr=new FriendRequest("usertestn1","usertestn2",1)
        const response = await request(app).post('/friendmanager/updaterequest/1').send({friendrequest: fr });
        expect(response.status).toBe(200);

    });


    test('friend request no existe',async () => {

        let fr=new FriendRequest("usernotexists1","usernotexists2",1)
        const response = await request(app).post('/friendmanager/updaterequest/1').send({friendrequest: fr});
        expect(response.status).toBe(404);

    });
});

describe('/friendmanager/friends', () => {
    test('user que existe',async () => {
        let user=new UserImpl("usertestn1","","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/friendmanager/friends').send({user:user});
        expect(response.status).toBe(200);
    });
});


describe('/friendmanager/add', () => {
    test('user que existe y amistad nueva',async () => {
        let user1=new UserImpl("usertestn6","","","")
        let user2=new UserImpl("usertestn8","","","")
        const response = await request(app).post('/friendmanager/add').send({sender:user1,receiver:user2});
        expect(response.status).toBe(200);
        //elimino la amistad para poder volver a ejecutar el test
        await FriendshipSchema.deleteOne({ sender: user1.username, receiver: user2.username })
    });

    test('user que existe y amistad ya existe',async () => {
        let user1=new UserImpl("usertestn6","","","")
        let user2=new UserImpl("usertestn7","","","")
        const response = await request(app).post('/friendmanager/add').send({sender:user1,receiver:user2});
        expect(response.status).toBe(404);
    });

    test('user que no existe',async () => {
        let user1=new UserImpl("usernotexists1","","","")
        let user2=new UserImpl("usernotexists2","","","")
        const response = await request(app).post('/friendmanager/add').send({sender:user1,receiver:user2});
        expect(response.status).toBe(404);
    });
});


describe('/usermanager/searchUserByUsername', () => {
    test('usuario que existe',async () => {
        const response = await request(app).get('/usermanager/searchUserByUsername?username=usertestn1');
        let user=JSON.parse(response.text);
        expect(response.status).toBe(200);
        expect(user.webID).toBe("webIdPrueba1");
        expect(user.description).toBe("descripcionprueba1");
    });
    test('usuario que no existe',async () => {
        const response = await request(app).get('/usermanager/searchUserByUsername?username=usernotexists');
        expect(response.status).toBe(404);
    });
});


describe('/friendmanager/deletefriend', () => {
    test('borrar amistad correctamente',async () => {
        let user1=new UserImpl("usertestn6","","","")
        let user2=new UserImpl("usertestn7","","","")
        const response = await request(app).post('/friendmanager/deletefriend').send({user:user1,friend:user2});
        expect(response.status).toBe(200);
        let fm= new FriendManagerImpl();
        await fm.enviarSolicitud(user1,user2);
        await fm.actualizarSolicitud(new FriendRequest(user1.username,user2.username,1),1);
    });
    test('amistad que no existe',async () => {
        let user1=new UserImpl("usertestn6","","","")
        let user2=new UserImpl("usertestn8","","","")
        const response = await request(app).post('/friendmanager/deletefriend').send({user:user1,friend:user2});
        expect(response.status).toBe(404);
    });
    test('usuario que no existe',async () => {
        let user1=new UserImpl("usernotexists1","","","")
        let user2=new UserImpl("usernotexists2","","","")
        const response = await request(app).post('/friendmanager/deletefriend').send({user:user1,friend:user2});
        expect(response.status).toBe(404);
    });
});
describe('/friendmanager/deletefriend', () => {
    test('borrar amistad correctamente',async () => {
        let user1=new UserImpl("usertestn6","","","")
        let user2=new UserImpl("usertestn7","","","")
        const response = await request(app).post('/friendmanager/deletefriend').send({user:user1,friend:user2});
        expect(response.status).toBe(200);
        let fm= new FriendManagerImpl();
        await fm.enviarSolicitud(user1,user2);
        await fm.actualizarSolicitud(new FriendRequest(user1.username,user2.username,1),1);
    });
    test('amistad que no existe',async () => {
        let user1=new UserImpl("usertestn6","","","")
        let user2=new UserImpl("usertestn8","","","")
        const response = await request(app).post('/friendmanager/deletefriend').send({user:user1,friend:user2});
        expect(response.status).toBe(404);
    });
    test('usuario que no existe',async () => {
        let user1=new UserImpl("usernotexists1","","","")
        let user2=new UserImpl("usernotexists2","","","")
        const response = await request(app).post('/friendmanager/deletefriend').send({user:user1,friend:user2});
        expect(response.status).toBe(404);
    });
});
describe('/usermanager/editpsw\'', () => {
    test('user existe y contrasena correcta',async () => {
        let user=new UserImpl("usertestn1","","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/usermanager/editpsw').send({user:user,oldpsw:"usertestN1.",newpsw:"usertestN1." });
        expect(response.status).toBe(200);
    });
    test('user existe y contrasena incorrecta',async () => {
        let user=new UserImpl("usertestn1","","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/usermanager/editpsw').send({user:user,oldpsw:"wrongpassword",newpsw:"usertestN1." });
        expect(response.status).toBe(404);
    });

    test('user no existe',async () => {
        let user=new UserImpl("usernotexists","","webIdPrueba1","descripcionprueba1")
        const response = await request(app).post('/usermanager/editpsw').send({user:user,oldpsw:"wrongpassword",newpsw:"usertestN1." });
        expect(response.status).toBe(404);
    });

});

