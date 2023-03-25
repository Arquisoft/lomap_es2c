import UserSchema from "../entities/UserSchema";
import { Group, MapManager, SesionManager, User } from "../facade";
import { Place } from "../facade";
import { PODManager } from "../facade";
export { MapManagerImpl };

const sessionStorage = require('sessionstorage-for-nodejs')

class MapManagerImpl implements MapManager {

    sessionManager: SesionManager;
    pod: PODManager;

    async verMapaDe (user: User) : Promise<Group[]> {
        let usuarioEncontrado = await UserSchema.findOne({
            username: user.username
        });

        let grupos = this.pod.getGrupos(usuarioEncontrado.webID)

        return grupos
    }

    añadirLugarAGrupo (lugar: Place, grupo: Group) : Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User

        grupo.places.push(lugar)

        this.pod.guardarGrupo(user.webID, grupo)

        return grupo;
    }


    crearGrupo (nombre: String) : Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User

        const grupo: Group = {
            name: nombre,
            places: []
        };

        this.pod.guardarGrupo(user.webID, grupo)

        return grupo;
    }

    // Incompleto
    eliminarGrupo(grupo: Group): boolean {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User;
      
        // let eliminado = this.pod.eliminarGrupo(user.webID, grupo)
      
        // return eliminado;

        return false;
      }

    
    eliminarLugarDeGrupo (lugar: Place, grupo: Group) : Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User

        const lugarIndex = grupo.places.findIndex(p => p.name === lugar.name);
        if (lugarIndex !== -1) {
            grupo.places.splice(lugarIndex, 1);
        }

        this.pod.guardarGrupo(user.webID, grupo)

        return grupo;
    }

    // Incompleto
    aplicarFiltro (grupo: Group, filtro: string) : Place[] {
        // return grupo.places.filter(filtro?);
        return null
    }


    editarGrupo(grupo: Group): Group {
        let user = JSON.parse(sessionStorage.getItem('userInSession') ?? '{}') as User;
      
        this.pod.guardarGrupo(user.webID, grupo);
      
        return grupo;
      }


    mostrarGrupo (grupo: Group) : Place[] {
        return grupo.places
    }

}


const map = new MapManagerImpl()

const place:Place = {
    name: "name",
    street: "street",
    postalcode: "postalcode",
    city: "city",
    country: "country",
    coordinates: "coordinate",
    review: "review",
    score: "score",
    image: "image"
}

const user:User = {
    username: "security",
    password: "pruebaSecurity",
    webID: "123456"
}

const group:Group = {
    name: "Grupo",
    places: [place]
}

console.log(map.mostrarGrupo(group))