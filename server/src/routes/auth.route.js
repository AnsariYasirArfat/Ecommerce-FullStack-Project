import { Router } from "express";
import {
  forgotPassword,
  getProfile,
  login,
  logout,
  resetPassword,
  signUp,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

router.get("/profile", isLoggedIn, getProfile);

export default router;
