import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
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
    password: {
        type: String,
        required: true
    },
}, { versionKey: false, timestamps: true })

export default mongoose.models.Admin || mongoose.model("Admin", schema)
