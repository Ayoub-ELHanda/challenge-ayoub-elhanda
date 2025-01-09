// src/config/db.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error('MONGO_URI environment variable is not set.');
}

console.log("Connecting to MongoDB with URI:", mongoURI);

export const connectDB = async (): Promise<void> => {
  // connection logic
};

export const disconnectDB = async (): Promise<void> => {
  // disconnection logic
};

export const dropTestDB = async (): Promise<void> => {
  // drop database logic
};

export const mongooseInstance = mongoose;