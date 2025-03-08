import mongoose from "mongoose";

export const connect = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }

        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB at ${connection.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
