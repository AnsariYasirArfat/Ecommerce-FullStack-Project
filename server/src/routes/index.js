import { Router } from "express";
import authRoutes from "./auth.route.js";
import categoryRoutes from "./category.route.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);

export default router;
