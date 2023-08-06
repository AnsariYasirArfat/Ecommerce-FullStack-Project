import { Router } from "express";
import {
  addToShopcart,
  deleteShopcartProduct,
  getShopCartProducts,
  updateShopcartProductQuantity,
} from "../controllers/shopcart.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/addtocart", isLoggedIn, addToShopcart);
router.put("/updatequantity", isLoggedIn, updateShopcartProductQuantity);

router.get("/", isLoggedIn, getShopCartProducts);

router.delete("/:id", isLoggedIn, deleteShopcartProduct);

export default router;
