import { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/your-db-name";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
    conn: typeof Mongoose | null;
    Promise: Promise<typeof Mongoose> | null;
}