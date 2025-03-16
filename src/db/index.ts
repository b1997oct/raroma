import mongoose from "mongoose";

const DB = process.env.DB
console.log('DB: ', DB);

mongoose.connect(DB)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((error) => {
        console.log("DB Error", error.message);
    })
