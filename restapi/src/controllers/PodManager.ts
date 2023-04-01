import { SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf";
import { Session } from "@inrupt/solid-client-authn-browser";
import { addStringNoLocale, addUrl, createSolidDataset, getSolidDataset, getStringNoLocale, getThingAll, getUrlAll } from "@inrupt/solid-client";
import { setThing, createThing } from "@inrupt/solid-client";
import { saveSolidDatasetAt } from "@inrupt/solid-client";
import { Place } from "../entities/Place";
import { Group, PODManager } from "../facade";


class PODManagerImpl implements PODManager {
    

    // podUrl must be correct for the moment
    async savePlace(session: Session, place: Place): Promise<void> {

    const datasetUrl = "https://uo282716.inrupt.net/profile/card#me/public/places";
    
    const newDataset = createSolidDataset();

        const newPlace = createThing();
        addStringNoLocale(newPlace, SCHEMA_INRUPT.name, place.name);
        addStringNoLocale(newPlace, SCHEMA_INRUPT.streetAddress, place.street);
        addStringNoLocale(newPlace, SCHEMA_INRUPT.postalCode, place.postalcode);
        addStringNoLocale(newPlace, SCHEMA_INRUPT.addressLocality, place.city);
        addStringNoLocale(newPlace, SCHEMA_INRUPT.addressCountry, place.country);
        addStringNoLocale(newPlace, SCHEMA_INRUPT.latitude, place.coordinates.split(",")[0]);
        addStringNoLocale(newPlace, SCHEMA_INRUPT.longitude, place.coordinates.split(",")[1]);
        addStringNoLocale(newPlace, SCHEMA_INRUPT.description, place.review);
        addStringNoLocale(newPlace, SCHEMA_INRUPT.value, place.score);
        addUrl(newPlace, SCHEMA_INRUPT.image, place.image);
    

        const updatedDataset = setThing(newDataset, newPlace);
        await saveSolidDatasetAt(datasetUrl, updatedDataset, { fetch: session.fetch });

    }

    async getPlaces(session: Session): Promise<Place[]> {
        const myDatasetUrl = "https://uo282716.inrupt.net/profile/card#me/public/places";
        const myDataset = await getSolidDataset(myDatasetUrl, { fetch: session.fetch });

        const places = getThingAll(myDataset).map((placeThing) => {
            return {
                name: getStringNoLocale(placeThing, SCHEMA_INRUPT.name),
                street: getStringNoLocale(placeThing, SCHEMA_INRUPT.streetAddress),
                postalcode: getStringNoLocale(placeThing, SCHEMA_INRUPT.postalCode),
                city: getStringNoLocale(placeThing, SCHEMA_INRUPT.addressLocality),
                country: getStringNoLocale(placeThing, SCHEMA_INRUPT.addressCountry),
                coordinates: getStringNoLocale(placeThing, SCHEMA_INRUPT.latitude + ',' + SCHEMA_INRUPT.longitude),
                review: getStringNoLocale(placeThing, SCHEMA_INRUPT.description),
                score: getStringNoLocale(placeThing, SCHEMA_INRUPT.value),
                image: getStringNoLocale(placeThing, SCHEMA_INRUPT.image),
            };
        });

        return places;
    }


    saveGroup: (session: Session, Group: Group) => Promise<void>;
    getGroups: (session: Session) => Promise<Group[]>;

}




export default PODManagerImpl;
