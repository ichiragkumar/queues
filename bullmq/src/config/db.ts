import mongoose from "mongoose";


export const connectToDb = () => {


    const MONGO_URI = process.env.MONGO_URI;

    if(!MONGO_URI){
        throw new Error("MONGO_URI is not set");
    }
    try {
        mongoose.connect(MONGO_URI);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log(error);
        throw new Error("Error connecting to mongodb");
    }


}