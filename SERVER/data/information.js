import { connectDB, getInformationCollection } from "../db/database.js";
import Mongoose from "mongoose";

export async function getAll() {
    try {
        await connectDB(); 
        const informationCollection = getInformationCollection();
        const data = await informationCollection.find().toArray();
        return data;
    } catch (error) {
        console.error("Error querying information:", error);
        throw error;
    } finally {
        Mongoose.connection.close();
    }
}