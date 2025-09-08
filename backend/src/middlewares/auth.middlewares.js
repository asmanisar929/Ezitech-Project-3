import { ApiError } from "../utils/ApiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("🔑 Incoming token:", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); //jwt.verify used to get decoded information
    console.log("✅ Decoded token:", decodedToken);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user; //add user information
    next();
  } catch (error) {
    console.error("❌ JWT error:", error.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
