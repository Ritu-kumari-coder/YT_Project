import mongoose from 'mongoose';
import { DB_NAME } from "./constants";
import connectDB from "./db"

import express from 'express';
const app = express();



/*
;( async () => {
    try {
        mongoose.connect(`${process.env.mongoose.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("Errr: ", error)
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("Error: ", error)
        throw err
    }
})()*/