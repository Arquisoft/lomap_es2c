import { model, Schema} from 'mongoose'

const placeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        postalcode: {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        coordinates: {
            type: String,
            required: true
        },
        review: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        images: {
            type: String,
            required: true
        }

    }
)

placeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Place = model("Place", placeSchema);

export default Place;