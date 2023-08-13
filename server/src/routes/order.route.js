import { Router } from "express";
import {
  generateOrder,
  generateRazorpayOrderId,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { isLoggedIn, authorize } from "../middleware/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router();
//Todo: add all routes here

router.post("/generate_razorpay_order", isLoggedIn, generateRazorpayOrderId);

router.post("/generateorder", isLoggedIn, generateOrder);

router.get("/myorder", isLoggedIn, getMyOrders);

router.get("/allorder", isLoggedIn, authorize(AuthRoles.ADMIN), getAllOrders);

router.put(
  "/updatestatus/:orderId",
  isLoggedIn,
  authorize(AuthRoles.ADMIN),
  updateOrderStatus
);

export default router;
