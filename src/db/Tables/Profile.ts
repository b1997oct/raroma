import mongoose, { Model, Mongoose } from "mongoose";
import { Schema, model, models } from "mongoose";

interface IProfile extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    subdomain: string;
}

const schema = new Schema<IProfile>({
    subdomain: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { versionKey: false, timestamps: true })

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model("Profile", schema)

export default Profile