import mongoose from "mongoose";
import Profile from "./Tables/Profile";
import set_subdomains from "./set_subdomains";

const DB = process.env.DB
console.log('DB: ', DB);

mongoose.connect(DB)
    .then(async () => {
        console.log("DB Connected");
        set_subdomains()
    })
    .catch((error) => {
        console.log("DB Error", error.message);
    })
