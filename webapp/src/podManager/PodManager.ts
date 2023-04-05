import { Session } from "@inrupt/solid-client-authn-browser";
import { addStringNoLocale, addUrl, createSolidDataset, getFile, getJsonLdParser, getSolidDataset, getStringNoLocale, getThingAll, getUrl, getUrlAll, overwriteFile } from "@inrupt/solid-client";
import { setThing, createThing, Thing } from "@inrupt/solid-client";
import { saveSolidDatasetAt } from "@inrupt/solid-client";
import { Group, Place } from "shared/shareddtypes";
import { JsonLdDocument, JsonLdProcessor } from 'jsonld';
import { wait } from "@testing-library/user-event/dist/utils";

class PodManager {
    

    // podUrl must be correct for the moment
    async savePlace(session: Session, place: Place): Promise<void> {
        console.log(session.info.isLoggedIn)
        try {

            let url = "https://uo282716.inrupt.net/profile/public/places/" + place.nombre

            let JSONLDplace: JsonLdDocument = {
              "@context": "https://schema.org",
              "@type": "Place",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": place.latitude,
                "longitude": place.longitud
              },
              "name": place.nombre
            }
    
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
        name: 'http://www.w3.org/2006/vcard/ns#fn',
        longitude: 'http://www.w3.org/2003/01/geo/wgs84_pos#long',
        latitude: 'http://www.w3.org/2003/01/geo/wgs84_pos#lat',
      }

      
      // Obtener el dataset de la carpeta Places
      const placesDataset = await getSolidDataset(placesFolderPath, { fetch: session.fetch });
    

      // Obtener todos los objetos de la carpeta Places
      const placeThings = getThingAll(placesDataset);
      placeThings.forEach((x:any)=>{
        console.log(x)
      })

      const urls = placeThings.map((placeThing: Thing) => {
        return placeThing.url
      })
      console.log(urls)

      // Mapear cada objeto en un lugar
      // const places: Place[] = await Promise.all(placeThings.map((placeThing: Thing) => {
      //   console.log(placeThing.url)
      //   const place: Place = {
      //     nombre: getUrl(placeThing, placeStructure.name),
      //     longitud: getUrl(placeThing, placeStructure.longitude),
      //     latitude: getUrl(placeThing, placeStructure.latitude),
      //   };
      //   console.log(place)
      //   return place;
      //   }));

        const places: Promise<Place>[] = []
        await Promise.all(placeThings.map((placeThing: Thing) => {
          if(!placeThing.url.endsWith('/')) {
            try {
              const place = this.get(session, placeThing.url);
              console.log(place)
              if (place !== undefined) {
                console.log(66)
                places.push(place);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }));
        
        setTimeout(() => {
          console.log('Después de 5 segundos');
        }, 5000);

      console.log(places.length)
      return await Promise.all(places);
    }

    async get(session: Session, url: string): Promise<Place> {
      try {
          const file = await getFile(
            url,
            {fetch: session.fetch}
          )

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
    

    // podUrl must be correct for the moment
    async saveGroup(session: Session, group: Group): Promise<void> {
      console.log(session.info.isLoggedIn)
      try {

          let url = "https://uo282716.inrupt.net/profile/public/groups/" + group.nombre.replace(/\s/g, '')
  
          let JSONLDgroup: JsonLdDocument = {
            "@context": "https://schema.org/",
            "@type": "Group",
            "name": group.nombre,
            "place": group.places.map(place => "https://uo282716.inrupt.net/profile/public/places/" + place.nombre.replace(/\s/g, ''))
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
