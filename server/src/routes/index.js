import { Router } from "express";
import authRoutes from "./auth.route.js";
import categoryRoutes from "./category.route.js";
import productRoutes from "./product.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);

export default router;
