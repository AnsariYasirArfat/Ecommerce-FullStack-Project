import { Router } from "express";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCouponStatus,
} from "../controllers/coupon.controller.js";
import { authorize, isLoggedIn } from "../middleware/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js";

const router = Router();

router.post(
  "/createcoupon",
  isLoggedIn,
  authorize(AuthRoles.ADMIN),
  createCoupon
);

router.put("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), updateCouponStatus);

router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN), deleteCoupon);

router.get("/", isLoggedIn, authorize(AuthRoles.ADMIN), getAllCoupons);

export default router;
