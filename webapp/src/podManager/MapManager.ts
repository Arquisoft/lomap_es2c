import { Session } from "@inrupt/solid-client-authn-browser/dist/Session";
import PodManager from "./PodManager";
import { Group, Place, User } from "shared/shareddtypes";

const sessionStorage = require('sessionstorage-for-nodejs')


const pod = new PodManager();

export async function verMapaDe(user: User, session: Session): Promise<Group[]> {
    let grupos = await pod.getGroups(session)
    return grupos
}

export async function verMapaDeAmigo(user: User, session: Session): Promise<Group[]> {
    let grupos = await pod.getFriendsGroups(session, user.webID)
    return grupos
}

export async function añadirLugarAGrupo(lugar: Place, grupo: Group, session: Session): Promise<Group> {
    grupo.places.push(lugar)

    await pod.updateGroup(session, grupo)

    return grupo;
}


export async function crearGrupo(name: string, session: Session): Promise<Group> {
    const grupo: Group = {
        name: name,
        places: []
    };
    await pod.saveGroup(session, grupo).catch((e: any) => {
        throw new Error("Primer grupo creado")
    }).finally(() => {
        return grupo;
    })
    return grupo;
}

// Incompleto
export async function eliminarGrupo(grupo: Group, session: Session): Promise<boolean> {
    await pod.deleteGroup(session, grupo)

    return true;
}


export async function eliminarLugarDeGrupo(lugar: Place, grupo: Group, session: Session): Promise<Group> {
    const lugarIndex = grupo.places.findIndex(p => p.nombre === lugar.nombre);
    if (lugarIndex !== -1) {
        grupo.places.splice(lugarIndex, 1);
    }

    await pod.updateGroup(session, grupo)

    return grupo;
}

export async function aplicarFiltro(grupo: Group, filtro: string, session: Session): Promise<Place[]> {

    let grupos = await pod.getGroups(session)

    let gr: Group = grupos.find(p => p.name === grupo.name)

    return gr.places.filter(p => p.category === filtro)
}


export async function editarGrupo(grupo: Group, session: Session): Promise<Group> {
    await pod.updateGroup(session, grupo);

    return grupo;
}


export function mostrarGrupoPod(grupo: Group, session: Session): Place[] {
    return grupo.places
}

export async function añadirGrupo(grupo: Group, session: Session): Promise<Group[]> {
    await pod.saveGroup(session, grupo);

    let grupos = await pod.getGroups(session);

    return grupos;
}