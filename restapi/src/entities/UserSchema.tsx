import { model, Schema } from 'mongoose'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        webID: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }

    }
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = model("User", userSchema);

export default User;