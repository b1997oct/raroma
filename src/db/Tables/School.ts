import mongoose, { Model, Schema, model } from "mongoose";

const schema = new Schema({
    user: {
        type: Schema.ObjectId,
        required: true,
    },
    school_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, { versionKey: false, timestamps: true })


export default mongoose.models.School || mongoose.model("School", schema) as Model<any>
