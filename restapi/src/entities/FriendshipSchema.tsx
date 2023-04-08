import { model, Schema } from 'mongoose';

const friendshipSchema = new Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        receiver: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            required: true,
        },
    }
)

friendshipSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Friendship = model("Friendship", friendshipSchema);

export default Friendship;