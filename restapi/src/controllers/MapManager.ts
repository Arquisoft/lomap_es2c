import { Place } from "../entities/Place";
import UserSchema from "../entities/UserSchema";
import { Group, MapManager, SesionManager, User } from "../facade";
import { PODManager } from "../facade";
export { MapManagerImpl };

const sessionStorage = require('sessionstorage-for-nodejs')

class MapManagerImpl implements MapManager {

    sessionManager: SesionManager;
    pod: PODManager;

    async verMapaDe(user: User): Promise<Group[]> {
        let usuarioEncontrado
        try {
            usuarioEncontrado = await UserSchema.findOne({
                username: user.username
            });
        }catch{
            throw new Error("Error en la base de datos")
        }
        let grupos
        try{
         grupos = this.pod.getGrupos(usuarioEncontrado.webID)
        }catch{
            throw new Error("Error en los pods")
        }
        return grupos
    }

    añadirLugarAGrupo(lugar: Place, grupo: Group): Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User

        grupo.places.push(lugar)

        this.pod.guardarGrupo(user.webID, grupo)

        return grupo;
    }


    crearGrupo(nombre: string): Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User

        const grupo: Group = {
            name: nombre.toString(),
            places: []
        };
        try {
            this.pod.guardarGrupo(user.webID, grupo)
        }catch{
            throw new Error("Error en los pods")
        }
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
    try{
        this.pod.guardarGrupo(user.webID, grupo)
    }catch{
        throw new Error("Error en los pods")
    }
        return grupo;
    }

    // Incompleto
    aplicarFiltro(grupo: Group, filtro: string): Place[] {
        // return grupo.places.filter(filtro?);
        return null
    }


    editarGrupo(grupo: Group): Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User;
        try{
        this.pod.guardarGrupo(user.webID, grupo);
        }catch{
            throw new Error("Error en los pods")
        }
        return grupo;
    }


    mostrarGrupo(grupo: Group): Place[] {
        return grupo.places
    }

}
