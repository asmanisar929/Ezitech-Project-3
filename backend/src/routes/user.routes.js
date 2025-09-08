import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  refreshAccessToken,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/profile").get(verifyJWT, getProfile);

//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
