import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";
import { createServer } from "http";

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  const server = createServer(app);
  server.emit("request", req, res);
}
