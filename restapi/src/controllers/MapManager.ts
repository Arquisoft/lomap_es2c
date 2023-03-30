import { Session } from "@inrupt/solid-client-authn-browser/dist/Session";
import { Place } from "../entities/Place";
import UserSchema from "../entities/UserSchema";
import { Group, MapManager, SesionManager, User } from "../facade";
import { PODManager } from "../facade";
import * as repo from '../persistence/Repository';
export { MapManagerImpl };

const sessionStorage = require('sessionstorage-for-nodejs')

class MapManagerImpl implements MapManager {

    session: Session
    sessionManager: SesionManager;
    pod: PODManager;

    constructor(session: Session){
        this.session = session
    }

    async verMapaDe(user: User): Promise<Group[]> {
        let usuarioEncontrado = await repo.Repository.findOne(user)

        let grupos = this.pod.getGroups(this.session)

        return grupos
    }

    añadirLugarAGrupo(lugar: Place, grupo: Group): Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User

        grupo.places.push(lugar)

        this.pod.saveGroup(this.session, grupo)

        return grupo;
    }


    crearGrupo(nombre: String): Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User

        const grupo: Group = {
            name: nombre,
            places: []
        };

        this.pod.saveGroup(this.session, grupo)

        return grupo;
    }

    // Incompleto
    eliminarGrupo(grupo: Group): boolean {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User;

        // let eliminado = this.pod.eliminarGrupo(user.webID, grupo)

        // return eliminado;

        return false;
    }


    eliminarLugarDeGrupo(lugar: Place, grupo: Group): Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User

        const lugarIndex = grupo.places.findIndex(p => p.name === lugar.name);
        if (lugarIndex !== -1) {
            grupo.places.splice(lugarIndex, 1);
        }

        this.pod.saveGroup(this.session, grupo)

        return grupo;
    }

    // Incompleto
    aplicarFiltro(grupo: Group, filtro: string): Place[] {
        // return grupo.places.filter(filtro?);
        return null
    }


    editarGrupo(grupo: Group): Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User;

        this.pod.saveGroup(this.session, grupo);

        return grupo;
    }


    mostrarGrupo(grupo: Group): Place[] {
        return grupo.places
    }

}