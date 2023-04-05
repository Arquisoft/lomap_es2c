import { Session } from "@inrupt/solid-client-authn-browser/dist/Session";
import PodManager from "./PodManager";
import { Group, Place, User } from "shared/shareddtypes";
export { MapManager };

const sessionStorage = require('sessionstorage-for-nodejs')

class MapManager {

    session: Session
    pod: PodManager;

    constructor(session: Session){
        this.session = session
    }

    async verMapaDe(user: User): Promise<Group[]> {
        let grupos = this.pod.getGroups(this.session)

        return grupos
    }

    añadirLugarAGrupo(lugar: Place, grupo: Group): Group {
        grupo.places.push(lugar)

        this.pod.saveGroup(this.session, grupo)

        return grupo;
    }


    crearGrupo(nombre: string): Group {
        const grupo: Group = {
            nombre: nombre,
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
        const lugarIndex = grupo.places.findIndex(p => p.nombre === lugar.nombre);
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
        this.pod.saveGroup(this.session, grupo);

        return grupo;
    }


    mostrarGrupo(grupo: Group): Place[] {
        return grupo.places
    }

    async añadirGrupo(grupo: Group): Promise<Group[]> {
        this.pod.saveGroup(this.session, grupo);

        let grupos = this.pod.getGroups(this.session);

        return grupos;
    }

}