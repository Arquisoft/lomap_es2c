"use strict";
/*
modificarWebID: (webid: string) => boolean;
    modificarNombre: (webid: string) => boolean;
    modificarContraseña: (webid: string) => boolean;
    modificarPerfil: (user: User) => boolean;
    listarDetalles: (user: User) => User;
    modificarPerfil: (user: User) => User;
    listarDetalles: (user: User) => User;
    */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/*
class crud{
    uri:String="mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
    mongoose= require('mongoose');
    esquema;
    constructor(){
        this.mongoose.set('strictQuery', true);
        this.esquema=new this.mongoose.Schema({
            username: String,
            password: String,
            webid: String,
            img: String
        })
    }

    async conectarse(){
        await this.mongoose.connect(this.uri);
    }

    async buscarUsuarioPorUsername(nombre:String){
        await this.conectarse();

        const a= new this.mongoose.model('user',this.esquema);

        const res=await a.findOne({username:nombre});
        console.log(res)
        this.mongoose.connection.close();
        
        const b=JSON.parse(res);

        return new User(b.username,b.password,b.webid,b.img);
    }

}*/
/*

class User {
    username: String
    password: String
    webid: String
    img: String


    constructor(username: String, password: String, webid: String,img: String){
            this.username=username;
            this.password=password;
            this.webid=webid;
            this.img=img;
        }
}*/
var User_1 = require("../pruebanode/User");
var UserManagerImpl = /** @class */ (function () {
    function UserManagerImpl() {
    }
    UserManagerImpl.prototype.listarDetalles = function (user) {
        var uri = "mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animals?retryWrites=true&w=majority";
        var mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        this.conectarse(mongoose, uri);
        var userSchema = new mongoose.Schema({
            username: String,
            password: String,
            webid: String,
            img: String
        });
        var usuario = mongoose.model('animals', userSchema);
        var resultado = this.buscar(user.username, usuario);
        console.log(resultado);
        mongoose.connection.close();
        var str = '{"username": "adrokoelloco","webid": "69","img": "imagen","password": "hola"}';
        var b;
        Object.assign(resultado, b);
        return new User_1["default"](b.username, b.password, b.webid, b.img);
    };
    UserManagerImpl.prototype.conectarse = function (mongoose, uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose.connect(uri)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserManagerImpl.prototype.buscar = function (nombre, usuario) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuario.findOne({ username: nombre }, 'username password webid img').exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserManagerImpl.prototype.modificarPerfil = function (user) {
        var uri = "mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
        var mongoose = require('mongoose');
        mongoose.set('strictQuery', true);
        this.conectarse(mongoose, uri);
        var userSchema = new mongoose.Schema({
            username: String,
            password: String,
            webid: String,
            img: String
        });
        var usuario = mongoose.model('animal', userSchema);
        var resultado = this.actualizar(usuario, user);
        //console.log(resultado.modifiedCount);
        mongoose.connection.close();
        return user;
    };
    UserManagerImpl.prototype.actualizar = function (usuario, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuario.updateOne({ username: user.username }, { webid: user.webid, img: user.img, password: user.password })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserManagerImpl;
}());
function buscarUsuarioPorUsername(u) {
    return __awaiter(this, void 0, void 0, function () {
        var uri, mongoose, userSchema, usuario, resultado, b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uri = "mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
                    mongoose = require('mongoose');
                    mongoose.set('strictQuery', true);
                    return [4 /*yield*/, mongoose.connect(uri)];
                case 1:
                    _a.sent();
                    userSchema = new mongoose.Schema({
                        username: String,
                        password: String,
                        webid: String,
                        img: String
                    });
                    usuario = mongoose.model('animals', userSchema);
                    return [4 /*yield*/, usuario.findOne({ username: u.username })];
                case 2:
                    resultado = _a.sent();
                    if (resultado == null) {
                        return [2 /*return*/, null];
                    }
                    ;
                    console.log(resultado);
                    resultado = resultado.toString();
                    mongoose.connection.close();
                    resultado = resultado.replace("username", '"username"');
                    resultado = resultado.replace("img", '"img"');
                    resultado = resultado.replace("password", '"password"');
                    resultado = resultado.replace("webid", '"webid"');
                    resultado = resultado.replaceAll("'", '"');
                    resultado = deleteSecondLine(resultado);
                    b = JSON.parse(resultado);
                    return [2 /*return*/, new User_1["default"](b.username, b.password, b.webid, b.img)];
            }
        });
    });
}
function deleteSecondLine(json) {
    var jsonArray = json.split("\n");
    jsonArray.splice(1, 1);
    return jsonArray.join("\n");
}
prueba()["catch"](function (err) { return console.log(err); });
function prueba() {
    return __awaiter(this, void 0, void 0, function () {
        var u, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    u = buscarUsuarioPorUsername(new User_1["default"]("adri", "", "", ""));
                    _b = (_a = console).log;
                    return [4 /*yield*/, u];
                case 1:
                    _b.apply(_a, [(_c.sent()).img]);
                    console.log("gola");
                    return [2 /*return*/];
            }
        });
    });
}
function modificarUsuario(user) {
    return __awaiter(this, void 0, void 0, function () {
        var uri, mongoose, userSchema, usuario, resultado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uri = "mongodb+srv://adrianfernandezalvarez02:6StwePBGphR8AJfa@cluster0.bty3mrz.mongodb.net/animales?retryWrites=true&w=majority";
                    mongoose = require('mongoose');
                    mongoose.set('strictQuery', true);
                    return [4 /*yield*/, mongoose.connect(uri)];
                case 1:
                    _a.sent();
                    userSchema = new mongoose.Schema({
                        username: String,
                        password: String,
                        webid: String,
                        img: String
                    });
                    usuario = mongoose.model('animal', userSchema);
                    return [4 /*yield*/, usuario.updateOne({ username: user.username }, { webid: user.webID, img: user.img, password: user.password })];
                case 2:
                    resultado = _a.sent();
                    console.log(resultado.modifiedCount);
                    mongoose.connection.close();
                    return [2 /*return*/, user];
            }
        });
    });
}
/*
prueba().catch(err => console.log(err));

async function prueba() {
    
    const u=modificarUsuario(new User("adrokoelloco","80","80","80"));
    console.log((await u).webid);



}*/
