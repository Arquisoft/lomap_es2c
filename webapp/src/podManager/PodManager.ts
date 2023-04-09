import { Session } from "@inrupt/solid-client-authn-browser";
import { addStringNoLocale, addUrl, createSolidDataset, getFile, getJsonLdParser, getSolidDataset, getStringNoLocale, getThingAll, getUrl, getUrlAll, overwriteFile } from "@inrupt/solid-client";
import { setThing, createThing, Thing } from "@inrupt/solid-client";
import { saveSolidDatasetAt } from "@inrupt/solid-client";
import { Group, Place } from "shared/shareddtypes";
import { JsonLdDocument, JsonLdProcessor } from 'jsonld';
import { wait } from "@testing-library/user-event/dist/utils";
import { url } from "inspector";

class PodManager {


    // podUrl must be correct for the moment
    async savePlace(session: Session, place: Place): Promise<void> {
        console.log(session)
        try {
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
            );
            console.log("Lugar añadido");
        } catch (error) {
            console.log(error);
        }
    }

    async getPlaces(session: Session): Promise<Place[]> {
        let url = session.info.webId.replace("card#me", "public") + "/places"

        try {
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
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async updateGroup(session: Session, group: Group): Promise<void> {
        try {
            console.log(2)

            let url = session.info.webId.replace("card#me", "public") + "/groups";
            let groups = await this.getGroups(session);

            groups.forEach((gr: Group) => {
                console.log(gr)
            })

            console.log(group)

            // Buscar el índice del grupo existente
            const groupIndex = groups.findIndex((oldGroup) => group.name == oldGroup.name);
            console.log(groupIndex)

            if (groupIndex === -1) {
                throw new Error(`No se encontró el grupo con el nombre ${group.name}`);
            }

            // Actualizar las propiedades del grupo existente
            groups[groupIndex] = group;

            console.log(groups)

            let JSONLDgroup: JsonLdDocument = {
                "@context": "https://schema.org",
                "@type": "Groups",
                "groups": groups.map((group) => ({
                    "@type": "Group",
                    "name": group.name,
                    "places": group.places.map((place) => ({
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
                }))
            };

            let blob = new Blob([JSON.stringify(JSONLDgroup)], { type: "application/ld+json" });
            let file = new File([blob], group.name + ".jsonld", { type: blob.type });

            await overwriteFile(
                url,
                file,
                { contentType: file.type, fetch: session.fetch }
            );
            console.log("Grupo añadido");
        } catch (error) {
            console.log(error);
        }
    }

    async deleteGroup(session: Session, group: Group): Promise<void> {
        try {
            console.log(2)

            let url = session.info.webId.replace("card#me", "public") + "/groups";
            let groups = await this.getGroups(session);

            groups.forEach((gr: Group) => {
                console.log(gr)
            })

            console.log(group)

            groups = groups.filter((oldGroup) => group.name !== oldGroup.name);

            console.log(groups)

            let JSONLDgroup: JsonLdDocument = {
                "@context": "https://schema.org",
                "@type": "Groups",
                "groups": groups.map((group) => ({
                    "@type": "Group",
                    "name": group.name,
                    "places": group.places.map((place) => ({
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
                }))
            };

            let blob = new Blob([JSON.stringify(JSONLDgroup)], { type: "application/ld+json" });
            let file = new File([blob], group.name + ".jsonld", { type: blob.type });

            await overwriteFile(
                url,
                file,
                { contentType: file.type, fetch: session.fetch }
            );
            console.log("Grupo añadido");
        } catch (error) {
            console.log(error);
        }
    }

    async saveGroup(session: Session, group: Group): Promise<void> {
        try {
            console.log(session)
            let url = session.info.webId.replace("card#me", "public") + "/groups";
            let groups = await this.getGroups(session);

            groups.push(group);

            let JSONLDgroup: JsonLdDocument = {
                "@context": "https://schema.org",
                "@type": "Groups",
                "groups": groups.map((group) => ({
                    "@type": "Group",
                    "name": group.name,
                    "places": group.places.map((place) => ({
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
                }))
            };

            let blob = new Blob([JSON.stringify(JSONLDgroup)], { type: "application/ld+json" });
            let file = new File([blob], group.name + ".jsonld", { type: blob.type });

            await overwriteFile(
                url,
                file,
                { contentType: file.type, fetch: session.fetch }
            );
            console.log("Grupo añadido");
        } catch (error) {
            console.log(error);
        }
    }

    async getGroups(session: Session): Promise<Group[]> {
        console.log("MANAGER")
        console.log(session)
        let url = session.info.webId.replace("card#me", "public") + "/groups"

        try {
            const file = await getFile(url, { fetch: session.fetch });
            const text = await file.text();
            const data = JSON.parse(text);

            if (data["@type"] === "Groups") {
                const groups = data.groups.map((group: any) => {
                    return {
                        name: group.name,
                        places: group.places.map((place: any) => ({
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
                        }))
                    };
                });
                return groups;
            } else {
                console.log("JSON-LD data is not of type 'Groups'");
                return [];
            }
        } catch (error) {
            console.log(error);
            return [];
        }
    }


}




export default PodManager;
