import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import { Session } from "@inrupt/solid-client-authn-browser";
import { addStringNoLocale, addUrl, createSolidDataset, getFile, getJsonLdParser, getSolidDataset, getStringNoLocale, getThingAll, getUrl, getUrlAll, overwriteFile } from "@inrupt/solid-client";
import { setThing, createThing } from "@inrupt/solid-client";
import { saveSolidDatasetAt } from "@inrupt/solid-client";
import { Group, Place } from "shared/shareddtypes";
import { JsonLdDocument, JsonLdProcessor } from 'jsonld';

class PodManager {
    

    // podUrl must be correct for the moment
    async savePlace(session: Session, place: Place): Promise<void> {
        console.log(session.info.isLoggedIn)
        try {

            let url = "https://uo282716.inrupt.net/profile/public/places/" + place.nombre
    
            let JSONLDplace: JsonLdDocument = {
                "@context": "https://schema.org/",
                "@type": "Place",
                "name": place.nombre,
                "latitude": place.latitude,
                "longitude": place.longitud
            };
    
            let blob = new Blob([JSON.stringify(JSONLDplace)], { type: "application/ld+json" });
            let file = new File([blob], place.nombre + ".jsonld", { type: blob.type });
    
            await overwriteFile(
                url,
                file,
                { contentType: file.type, fetch: session.fetch }
            );
        } catch (error) {
            console.log(error);
        }

    }

    


    async getPlaces(session: Session): Promise<Place[]> {
      const placesFolderPath = 'https://uo282716.inrupt.net/profile/public/places/';
      const placeStructure = {
        name: 'http://schema.org/name',
        longitude: 'http://schema.org/longitude',
        latitude: 'http://schema.org/latitude',
      }

      
      // Obtener el dataset de la carpeta Places
      const placesDataset = await getSolidDataset(placesFolderPath, { fetch: session.fetch });
    

      // Obtener todos los objetos de la carpeta Places
      const placeThings = getThingAll(placesDataset);
      placeThings.forEach((x:any)=>{
        console.log(x)
      })

      // Mapear cada objeto en un lugar
      const places: Place[] = placeThings.map((placeThing) => {
        console.log(placeThing.predicates)
        const place: Place = {
          nombre: getUrl(placeThing, placeStructure.name),
          longitud: getUrl(placeThing, placeStructure.longitude),
          latitude: getUrl(placeThing, placeStructure.latitude),
        };
        console.log(place)
        return place;
      });

        // await this.get(session, placeThing.url).then((place:Place) =>{
        //   console.log(place)
        //   if(place != undefined){
            
        //     console.log("a")
        //     places.push(place)
        //   }
        //   return place
        // }).catch((e: Error) => {

        // })

        
      

 
      console.log(places.length)
      return places;
    }

    async get(session: Session, url: string): Promise<Place> {
      try {
        const file = await getFile(
          url,
          {fetch: session.fetch}
        );

          const text = await file.text();

          const data = JSON.parse(text);

          const place: Place = { nombre: null, latitude: null, longitud:null};

          if (data["@type"] === "Place") {
            place.nombre = data.name
            place.longitud = data.longitude
            place.latitude = data.latitude
          };

          console.log(place)
          return place;
      } catch (error) {
        console.log(error);
        //return [];
      }
    }

    async getPlace(session: Session): Promise<Place[]> {
        try {
          const url = "https://uo282716.inrupt.net/profile/public/places/Oviedo";


          const file = await getFile(
            url,
            {fetch: session.fetch}
        );

            const text = await file.text();
            const parser = getJsonLdParser();
            console.log("1")

            console.log(text)
            const data = JSON.parse(text);

            const places: Place[] = [];


              console.log("1")
                if (data["@type"] === "Place") {
                  console.log("a")
                const place: Place = {
                    nombre: data.name,
                    longitud: data.longitude,
                    latitude: data.latitude,
                };
                console.log(place)
                places.push(place);
                }
            
            console.log(places)
            return places;
        } catch (error) {
          console.log(error);
          //return [];
        }
      }
      

    async saveGroup(session: Session, group: Group): Promise<void> {
        try {
            let url = "https://uo282716.inrupt.net/profile/card#me/public/groups/" + group.nombre.replace(/\s/g, '');
    
            let JSONLDgroup: JsonLdDocument = {
                "@context": "https://schema.org/",
                "@type": "Group",
                "name": group.nombre,
                "place": group.places.map(place => "https://uo282716.inrupt.net/profile/card#me/public/places/" + place.nombre.replace(/\s/g, ''))
            };
    
            let blob = new Blob([JSON.stringify(JSONLDgroup)], { type: "application/ld+json" });
            let file = new File([blob], group.nombre + ".jsonld", { type: blob.type });
    
            await overwriteFile(
                url,
                file,
                { contentType: file.type, fetch: session.fetch }
            );
        } catch (error) {
            console.log(error);
        }
    }
    
    async getGroups(session: Session): Promise<Group[]> {
        try {
          const url = "https://uo282716.inrupt.net/profile/card#me/public/groups/";
          const response = await session.fetch(url, {
            method: "GET",
            headers: {
              Accept: "application/ld+json",
            },
          });
      
          const data = await response.json();
          const groups: Group[] = [];
      
          if (data && data["@graph"]) {
            data["@graph"].forEach((graph: any) => {
              if (graph["@type"] === "foaf:Group") {
                const nombre = graph["foaf:nombre"];
                const places = graph["schema:hasMap"].map((place: any) => {
                  return {
                    nombre: graph.nombre,
                    longitud: graph.longitud,
                    latitude: graph.latitude
                  };
                });
      
                const group: Group = {
                  nombre,
                  places,
                };
                groups.push(group);
              }
            });
          }
          return groups;
        } catch (error) {
          console.log(error);
          return [];
        }
      }

}




export default PodManager;
