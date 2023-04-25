import { Session } from "@inrupt/solid-client-authn-browser";
import { createAclFromFallbackAcl, saveAclFor, getFile, getResourceAcl, getSolidDataset, getSolidDatasetWithAcl, hasAccessibleAcl, hasFallbackAcl, hasResourceAcl, overwriteFile, setAgentDefaultAccess, setAgentResourceAccess, Access, AclDataset, getThing, getIri } from "@inrupt/solid-client";
import { Group, Place } from "shared/shareddtypes";
import { JsonLdDocument } from 'jsonld';
import { v4 as uuidv4 } from 'uuid';

class PodManager {


    // podUrl must be correct for the moment
    async savePlace(session: Session, place: Place): Promise<void> {
        try
        {
            if(session.info.webId) {
            let url = session.info.webId.replace("card#me", "public") + "/places";
            let places = await this.getPlaces(session);

            places.push(place);

            let JSONLDplace: JsonLdDocument = {
                "@context": "https://schema.org",
                "@type": "Places",
                "places": places.map((place) => ({
                    "@type": "Place",
                    "name": place.nombre,
                    "category": place.category,
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": place.latitude,
                        "longitude": place.longitude
                    },
                    "description": place.description,
                    "comment": place.comments.map((comment) => ({
                        "@type": "Comment",
                        "author": comment.author,
                        "comment": comment.comment,
                        "date": comment.date
                    })),
                    "reviewScore": place.reviewScore,
                    "date": place.date
                }))
            };

            let blob = new Blob([JSON.stringify(JSONLDplace)], { type: "application/ld+json" });
            let file = new File([blob], place.nombre + ".jsonld", { type: blob.type });

            await overwriteFile(
                url,
                file,
                { contentType: file.type, fetch: session.fetch }
            );}
        } catch (error) {
            console.log(error);
        }
    }

    async getPlaces(session: Session): Promise<Place[]> {

        try
        {
            if (session.info.webId) {
            let url = session.info.webId.replace("card#me", "public") + "/places"
            const file = await getFile(url, { fetch: session.fetch });
            const text = await file.text();
            const data = JSON.parse(text);

            if (data["@type"] === "Places") {
                const places = data.places.map((place: any) => {
                    return {
                        nombre: place.name,
                        category: place.category,
                        longitude: place.geo.longitude,
                        latitude: place.geo.latitude,
                        description: place.description,
                        comments: place.comment.map((comment: any) => ({
                            author: comment.author,
                            comment: comment.comment,
                            date: comment.date
                        })),
                        reviewScore: place.reviewScore,
                        date: place.date
                    };
                });
                return places;
            } else {
                console.log("JSON-LD data is not of type 'Places'");
                return [];
            }}
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async updateGroup(session: Session, group: Group): Promise<void> {
        try
        {
            if (session.info.webId)  {
                let url = session?.info.webId.replace("profile/card#me", "lomap")

                let groups = await this.getGroups(session);


                // Buscar el índice del grupo existente
                const groupIndex = groups.findIndex((oldGroup) => group.name === oldGroup.name);


                if (groupIndex === -1) {
                    throw new Error(`No se encontró el grupo con el nombre ${group.name}`);
                }

                // Actualizar las propiedades del grupo existente
                groups[groupIndex] = group;


                let JSONLDgroup: JsonLdDocument = {
                    "@context": "https://schema.org",
                    "@type": "Maps",
                    "maps": groups.map((group) => ({
                        "@type": "Map",
                        "identifier": uuidv4(),
                        "name": group.name,
                        "author": {
                            "@type": "Person",
                            "identifier": session.info.webId
                        },
                        "spatialCoverage": group.places.map((place) => ({
                            "@type": "Place",
                            "identifier": uuidv4(),
                            "name": place.nombre,
                            "author": {
                                "@type": "Person",
                                "identifier": session.info.webId
                            },
                            "additionalType": place.category,
                            "latitude": place.latitude,
                            "longitude": place.longitude,
                            "description": place.description,
                            "review": place.comments.map((comment) => ({
                                "@type": "Review",
                                "author": {
                                    "@type": "Person",
                                    "identifier": comment.author
                                },
                                "reviewRating": {
                                    "@type": "Rating",
                                    "ratingValue": place.reviewScore
                                },
                                "datePublished": comment.date,
                                "rewievBody": comment.comment
                            })),
                            "image": place.images.map((image) => ({
                                "@type": "ImageObject",
                                "author": {
                                    "@type": "Person",
                                    "identifier": image.author
                                },
                                "contentUrl": image.url
                            })),
                            "reviewScore": place.reviewScore,
                            "date": place.date
                        })
                        )
                    }))
                };

                let blob = new Blob([JSON.stringify(JSONLDgroup)], { type: "application/ld+json" });
                let file = new File([blob], group.name + ".jsonld", { type: blob.type });

                await overwriteFile(
                    url,
                    file,
                    { contentType: file.type, fetch: session.fetch }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteGroup(session: Session, group: Group): Promise<void> {
        try {
           
            if (session.info.webId) {
                
                let url = session?.info.webId.replace("profile/card#me", "lomap")

                let groups = await this.getGroups(session);


                groups = groups.filter((oldGroup) => group.name !== oldGroup.name);



                let JSONLDgroup: JsonLdDocument = {
                    "@context": "https://schema.org",
                    "@type": "Maps",
                    "maps": groups.map((group) => ({
                        "@type": "Map",
                        "identifier": uuidv4(),
                        "name": group.name,
                        "author": {
                            "@type": "Person",
                            "identifier": session.info.webId
                        },
                        "spatialCoverage": group.places.map((place) => ({
                            "@type": "Place",
                            "identifier": uuidv4(),
                            "name": place.nombre,
                            "author": {
                                "@type": "Person",
                                "identifier": session.info.webId
                            },
                            "additionalType": place.category,
                            "latitude": place.latitude,
                            "longitude": place.longitude,
                            "description": place.description,
                            "review": place.comments.map((comment) => ({
                                "@type": "Review",
                                "author": {
                                    "@type": "Person",
                                    "identifier": comment.author
                                },
                                "reviewRating": {
                                    "@type": "Rating",
                                    "ratingValue": place.reviewScore
                                },
                                "datePublished": comment.date,
                                "rewievBody": comment.comment
                            })),
                            "image": place.images.map((image) => ({
                                "@type": "ImageObject",
                                "author": {
                                    "@type": "Person",
                                    "identifier": image.author
                                },
                                "contentUrl": image.url
                            })),
                            "reviewScore": place.reviewScore,
                            "date": place.date
                        })
                        )
                    }))
                };

                let blob = new Blob([JSON.stringify(JSONLDgroup)], { type: "application/ld+json" });
                let file = new File([blob], group.name + ".jsonld", { type: blob.type });

                await overwriteFile(
                    url,
                    file,
                    { contentType: file.type, fetch: session.fetch }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveGroup(session: Session, group: Group): Promise<void> {
        try
        {
            if(session.info.webId)
            {
                let url = session?.info.webId.replace("profile/card#me", "lomap")
                let groups = await this.getGroups(session);

                groups.push(group);

                let JSONLDgroup: JsonLdDocument = {
                    "@context": "https://schema.org",
                    "@type": "Maps",
                    "maps": groups.map((group) => ({
                        "@type": "Map",
                        "identifier": uuidv4(),
                        "name": group.name,
                        "author": {
                            "@type": "Person",
                            "identifier": session.info.webId
                        },
                        "spatialCoverage": group.places.map((place) => ({
                            "@type": "Place",
                            "identifier": uuidv4(),
                            "name": place.nombre,
                            "author": {
                                "@type": "Person",
                                "identifier": session.info.webId
                            },
                            "additionalType": place.category,
                            "latitude": place.latitude,
                            "longitude": place.longitude,
                            "description": place.description,
                            "review": place.comments.map((comment) => ({
                                "@type": "Review",
                                "author": {
                                    "@type": "Person",
                                    "identifier": comment.author
                                },
                                "reviewRating": {
                                    "@type": "Rating",
                                    "ratingValue": place.reviewScore
                                },
                                "datePublished": comment.date,
                                "rewievBody": comment.comment
                            })),
                            "image": place.images.map((image) => ({
                                "@type": "ImageObject",
                                "author": {
                                    "@type": "Person",
                                    "identifier": image.author
                                },
                                "contentUrl": image.url
                            })),
                            "reviewScore": place.reviewScore,
                            "date": place.date
                        })
                        )
                    }))
                };

                let blob = new Blob([JSON.stringify(JSONLDgroup)], { type: "application/ld+json" });
                let file = new File([blob], group.name + ".jsonld", { type: blob.type });

                await overwriteFile(
                    url,
                    file,
                    { contentType: file.type, fetch: session.fetch }
                    );
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getGroups(session: Session): Promise<Group[]> {
        

        try
        {
            if (session.info.webId)
            {    let url = session?.info.webId.replace("profile/card#me", "lomap")
                const file = await getFile(url, { fetch: session.fetch });
                const text = await file.text();
                const data = JSON.parse(text);

                if (data["@type"] === "Maps") {
                    const groups = data.maps.map((map: any) => {
                        return {
                            name: map.name,
                            places: map.spatialCoverage.map((place: any) => ({
                                nombre: place.name,
                                category: place.additionalType,
                                longitude: place.longitude,
                                latitude: place.latitude,
                                description: place.description,
                                comments: place.review.map((review: any) => ({
                                    author: review.author.identifier,
                                    comment: review.rewievBody,
                                    date: review.datePublished
                                })),
                                images: place.image.map((image: any) => ({
                                    author: image.author.identifier,
                                    url: image.contentUrl
                                })),
                                reviewScore: place.reviewScore,
                                date: place.date
                            }))
                        };
                    });
                    return groups;
                } else {
                    console.log("JSON-LD data is not of type 'Maps'");
                    return [];
                }
            } else
            {
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async addReadPermissionsToFriend(webId: string, friendWebId: string, session: Session): Promise<void> {
        // Obtener el SolidDataset y su ACL asociada, si está disponible
        const myDatasetWithAcl = await getSolidDatasetWithAcl(webId, { fetch: session.fetch });

        // Obtener la ACL propia del SolidDataset, si está disponible,
        // o inicializar una nueva, si es posible:
        let resourceAcl: AclDataset;
        if (!hasResourceAcl(myDatasetWithAcl)) {

          if (!hasAccessibleAcl(myDatasetWithAcl)) {
            throw new Error("El usuario actual no tiene permiso para cambiar los permisos de acceso a este recurso.");
          }
          if (!hasFallbackAcl(myDatasetWithAcl)) {
            throw new Error("El usuario actual no tiene permiso para ver quién tiene acceso a este recurso.");
            // Alternativamente, inicializa una nueva ACL vacía de la siguiente manera,
            // pero ten en cuenta que si no le das a alguien acceso de Control,
            // **nadie podrá cambiar los permisos de acceso en el futuro**:
            // resourceAcl = createAcl(myDatasetWithAcl);
          }
          resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
        } else {
          resourceAcl = getResourceAcl(myDatasetWithAcl);
          console.log(resourceAcl)
        }

        // Agregar permisos de lectura al amigo especificado en el recurso:
        const access: Access = { read: true, append: false, write: false, control: false };
        let updatedAcl = setAgentResourceAccess(resourceAcl, friendWebId, access);
        updatedAcl = setAgentDefaultAccess(updatedAcl, friendWebId, access);

        // Guardar la ACL actualizada:
        await saveAclFor(myDatasetWithAcl, updatedAcl, { fetch: session.fetch });
    }

    async getFriendsGroups(session: Session, url: string): Promise<Group[]> {
       
        try
        {
            if (session.info.webId)
             {    url = url.replace("profile/card#me", "lomap")

            const file = await getFile(url, { fetch: session.fetch });
            const text = await file.text();
            const data = JSON.parse(text);

            if (data["@type"] === "Maps") {
                const groups = data.maps.map((map: any) => {
                    return {
                        name: map.name,
                        places: map.spatialCoverage.map((place: any) => ({
                            nombre: place.name,
                            category: place.additionalType,
                            longitude: place.longitude,
                            latitude: place.latitude,
                            description: place.description,
                            comments: place.review.map((review: any) => ({
                                author: review.author.identifier,
                                comment: review.rewievBody,
                                date: review.datePublished
                            })),
                            images: place.image.map((image: any) => ({
                                author: image.author.identifier,
                                url: image.contentUrl
                              })),
                            reviewScore: place.reviewScore,
                            date: place.date
                        }))
                    };
                });
                return groups;
            } else {
                console.log("JSON-LD data is not of type 'Maps'");
                return [];
                }
            } else
            {
                return [];
            }
            
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async getPhoto(session: Session): Promise<string> {
        try{
            const dataset = await getSolidDataset(session.info.webId)
            const profile = getThing(dataset, session.info.webId)
            const photoUrl = getIri(profile, "http://www.w3.org/2006/vcard/ns#hasPhoto")

            return photoUrl
        } catch(error){
            console.log(error)
            return null
        }
    }


}




export default PodManager;