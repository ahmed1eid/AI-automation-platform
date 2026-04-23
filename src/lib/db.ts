import mongoose from "mongoose";

interface MongooseCache {
    conn: typeof mongoose | null;
    Promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, Promise: null };
}

async function connectToDatabase() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        throw new Error("Missing MONGODB_URI environment variable");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.Promise) {
        const apts = {
            bufferCommands: false,
        };
        cached.Promise = mongoose.connect(mongoUri, apts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.Promise;
    } catch (error) {
        cached.Promise = null;
        throw error;
    }
    return cached.conn;
}

export default connectToDatabase;
