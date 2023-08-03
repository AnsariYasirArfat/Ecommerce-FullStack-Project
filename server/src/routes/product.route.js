import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getALLProducts,
  getProductByCategoryId,
  getProductById,
} from "../controllers/product.controller.js";
import { authorize, isLoggedIn } from "../middleware/auth.middleware.js";
import AuthRoles from "../utils/authRoles";

const router = Router();

router.post("/addproduct", isLoggedIn, authorize(AuthRoles.ADMIN), addProduct);
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteProduct);

router.get(
  "/getallproducts",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),
  getALLProducts
);
router.get(
  "/product/:id",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),
  getProductById
);
router.get(
  "/productcategory/:id",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),
  getProductByCategoryId
);

export default router;
