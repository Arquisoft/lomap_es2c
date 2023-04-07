import { Session } from "@inrupt/solid-client-authn-browser/dist/Session";
import PodManager from "./PodManager";
import { Group, Place, User } from "shared/shareddtypes";
export { MapManager };

const sessionStorage = require('sessionstorage-for-nodejs')

class MapManager {

    pod: PodManager = new PodManager();

    async verMapaDe(user: User, session: Session): Promise<Group[]> {
        let grupos = await this.pod.getGroups(session)

        return grupos
    }

    async añadirLugarAGrupo(lugar: Place, grupo: Group, session: Session): Promise<Group> {
        grupo.places.push(lugar)

        console.log(1)

        await this.pod.updateGroup(session, grupo)

        return grupo;
    }


    async crearGrupo(name: string, session: Session): Promise<Group> {
        const grupo: Group = {
            name: name,
            places: []
        };

        await this.pod.saveGroup(session, grupo)

        return grupo;
    }

    // Incompleto
    eliminarGrupo(grupo: Group, session: Session): boolean {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User;

        let eliminado = this.pod.deleteGroup(session, grupo)

        // return eliminado;

        return false;
    }


    async eliminarLugarDeGrupo(lugar: Place, grupo: Group, session: Session): Promise<Group> {
        const lugarIndex = grupo.places.findIndex(p => p.nombre === lugar.nombre);
        if (lugarIndex !== -1) {
            grupo.places.splice(lugarIndex, 1);
        }

        await this.pod.updateGroup(session, grupo)

        return grupo;
    }

    async aplicarFiltro(grupo: Group, filtro: string, session: Session): Promise<Place[]> {

        let grupos = await this.pod.getGroups(session)
        
        let gr: Group = grupos.find(p => p.name === grupo.name)

        return gr.places.filter(p => p.category === filtro)
    }


    async editarGrupo(grupo: Group, session: Session): Promise<Group> {
        await this.pod.updateGroup(session, grupo);

        return grupo;
    }


    mostrarGrupo(grupo: Group, session: Session): Place[] {
        return grupo.places
    }

    async añadirGrupo(grupo: Group, session: Session): Promise<Group[]> {
        await this.pod.saveGroup(session, grupo);

        let grupos = await this.pod.getGroups(session);

        return grupos;
    }

}