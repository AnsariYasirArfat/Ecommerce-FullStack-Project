import { Router } from "express";
import {
  addToWishlist,
  deleteFromWishlist,
  getWishlist,
} from "../controllers/wishlist.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/addtowishlist", isLoggedIn, addToWishlist);

router.get("/", isLoggedIn, getWishlist);

router.delete("/deletewishlist", isLoggedIn, deleteFromWishlist);

export default router;
