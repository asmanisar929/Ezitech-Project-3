// backend.js
import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB(); // ensure DB connection once
    isConnected = true;
  }

  return app(req, res);
}
