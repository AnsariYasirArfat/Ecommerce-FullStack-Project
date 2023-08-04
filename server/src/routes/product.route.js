import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getALLProducts,
  getProductByCategoryId,
  getProductById,
} from "../controllers/product.controller.js";
import { authorize, isLoggedIn } from "../middleware/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Product Route here!");
});
router.post(
  "/addproduct",
  /*isLoggedIn, authorize(AuthRoles.ADMIN),*/ addProduct
);
router.delete(
  "/:id",
  /*isLoggedIn, authorize(AuthRoles.ADMIN),*/ deleteProduct
);

router.get(
  "/getallproducts",
  /*isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),*/
  getALLProducts
);
router.get(
  "/productid/:id",
  /*isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),*/
  getProductById
);
router.get(
  "/productcategory/:id",
  /*isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),*/
  getProductByCategoryId
);

export default router;
