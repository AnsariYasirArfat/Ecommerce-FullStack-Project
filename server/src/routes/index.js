import { Router } from "express";
import authRoutes from "./auth.route.js";
import categoryRoutes from "./category.route.js";
import productRoutes from "./product.route.js";
import wishlistProducts from "./wishlist.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/product", productRoutes);
router.use("/wishlist", wishlistProducts);

export default router;
