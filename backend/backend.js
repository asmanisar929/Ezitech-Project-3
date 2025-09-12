import serverless from "serverless-http";
import { app } from "./src/app.js";
import connectDB from "./src/db/index.js";

// Ensure DB connection before handling requests
await connectDB();

export default serverless(app);
