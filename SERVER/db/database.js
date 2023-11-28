import Mongoose from "mongoose";
import { config } from "../config.js";

let db;

export async function connectDB() {
    try {
        const connection = await Mongoose.connect(config.db.host, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "banapress"
        });
        db = connection.connection;
        console.log("연결완료");
    } catch (error) {
        console.error("MongoDB 연결 실패:", error);
        throw error;
    }
}

export function getInformationCollection() {
    return db.collection("stores");
}
