import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { authorize, isLoggedIn } from "../middleware/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router();

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCategory);

router.delete(
  "/:id",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),
  deleteCategory
);

router.put(
  "/action/:id",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),
  updateCategory
);

router.get(
  "/",
  isLoggedIn,
  authorize(AuthRoles.ADMIN, AuthRoles.USER),
  getAllCategory
);

export default router;
