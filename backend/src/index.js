import { app } from "./app.js";
import connectDB from "./db/index.js";
//require("dotenv").config({ path: "./.env" });    //either use required or below import ur choice
import dotenv from "dotenv"; //after this also do changings in package.joson in scripts

dotenv.config({ path: "./.env" });
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Express error:", err);
      throw err;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!!", err);
  });
