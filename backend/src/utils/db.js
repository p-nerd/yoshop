import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectToMongoDB = async () => {
    try {
        const c = await mongoose.connect(MONGO_URI, {});
        console.log(`MongoDB Connected: ${c.connection.host}`);
    } catch (e) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectToMongoDB;
