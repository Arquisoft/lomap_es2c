import { model, Schema} from 'mongoose';

const friendshipSchema = new Schema(
    {
        sender: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        receiver: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        status: Boolean
    }
)

friendshipSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Friendship = model("User", friendshipSchema);

export default Friendship;