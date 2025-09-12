import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let isConnected = false; // track connection status

const connectDB = async () => {
  if (isConnected) {
    return; // already connected, skip
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    isConnected = true;
    console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error; // let caller handle it instead of exiting
  }
};

export default connectDB;
