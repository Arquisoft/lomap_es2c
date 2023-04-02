import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import { Session } from "@inrupt/solid-client-authn-browser";
import { addStringNoLocale, addUrl, createSolidDataset, getSolidDataset, getStringNoLocale, getThingAll, getUrlAll, overwriteFile } from "@inrupt/solid-client";
import { setThing, createThing } from "@inrupt/solid-client";
import { saveSolidDatasetAt } from "@inrupt/solid-client";
import { Place } from "../entities/Place";
import { Group, PODManager } from "../facade";
import { JsonLdDocument } from 'jsonld';



class PODManagerImpl implements PODManager {
    
    // podUrl must be correct for the moment
    async savePlace(session: Session, place: Place): Promise<void> {
        try {

            let url = "https://uo282716.inrupt.net/profile/card#me/public/places"
    
            let JSONLDplace: JsonLdDocument = {
                "@context": "https://schema.org/",
                "@type": "Place",
                "name": place.name,
                "street": place.street,
                "postalCode": place.postalcode,
                "city": place.city,
                "country":place.country,
                "latitude": place.coordinates.split(",")[0],
                "longitude": place.coordinates.split(",")[1],
                "review": place.review,
                "score": place.score,
                "image": place.image
            };
    
            let blob = new Blob([JSON.stringify(JSONLDplace)], { type: "application/ld+json" });
            let file = new File([blob], place.name + ".jsonld", { type: blob.type });
    
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
        try {
          const url = "https://uo282716.inrupt.net/profile/card#me/public/places/";
          const response = await session.fetch(url, {
            method: "GET",
            headers: {
              Accept: "application/ld+json",
            },
          });
      
          const data = await response.json();
          const places: Place[] = [];
      
          if (data && data["@graph"]) {
            data["@graph"].forEach((graph: any) => {
              if (graph["@type"] === "Place") {
                const place: Place = {
                  name: graph.name,
                  street: graph.street,
                  postalcode: graph.postalCode,
                  city: graph.city,
                  country: graph.country,
                  coordinates: graph.latitude + "," + graph.longitude,
                  review: graph.review,
                  score: graph.score,
                  image: graph.image,
                };
                places.push(place);
              }
            });
          }
          return places;
        } catch (error) {
          console.log(error);
          return [];
        }
      }
      

    async saveGroup(session: Session, group: Group): Promise<void> {
        try {
            let url = "https://uo282716.inrupt.net/profile/card#me/public/groups/" + group.name.replace(/\s/g, '');
    
            let JSONLDgroup: JsonLdDocument = {
                "@context": "https://schema.org/",
                "@type": "Group",
                "name": group.name,
                "place": group.places.map(place => "https://uo282716.inrupt.net/profile/card#me/public/places/" + place.name.replace(/\s/g, ''))
            };
    
            let blob = new Blob([JSON.stringify(JSONLDgroup)], { type: "application/ld+json" });
            let file = new File([blob], group.name + ".jsonld", { type: blob.type });
    
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
                const name = graph["foaf:name"];
                const places = graph["schema:hasMap"].map((place: any) => {
                  return {
                    name: place.name,
                    street: place.street,
                    postalcode: place.postalCode,
                    city: place.city,
                    country: place.country,
                    coordinates: place.latitude + "," + place.longitude,
                    review: place.review,
                    score: place.score,
                    image: place.image,
                  };
                });
      
                const group: Group = {
                  name,
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

export default PODManagerImpl;
