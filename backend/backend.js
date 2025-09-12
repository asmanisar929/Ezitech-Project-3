// backend.js
import serverless from "serverless-http";
import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";

let isConnected = false;

async function makeHandler() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return serverless(app);
}

export default async function handler(req, res) {
  const h = await makeHandler();
  return h(req, res);
}
