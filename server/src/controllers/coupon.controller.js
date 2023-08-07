import Coupon from "../models/coupon.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";

/**********************************************************
 * @CREATE_COUPON
 * @route POST <URL>/api/coupon/create
 * @description Controller used for creating a new coupon
 * @description Only admin can create the coupon
 * @returns Coupon Object with success message "Coupon Created SuccessFully"
 *********************************************************/
export const createCoupon = asyncHandler(async (req, res) => {
  const { code, discount } = req.body;
  if (!code || !discount) {
    throw new CustomError("Code and discount are required", 400);
  }
  // check id code already exists
  const exitingCoupon = await User.findOne({ code });
  if (exitingCoupon) {
    throw new CustomError("Coupon code already exists", 400);
  }

  const coupon = await Coupon.create({ code, discount });
  res.status(200).json({
    success: true,
    message: "Coupon created successfully",
    coupon,
  });
});

/**********************************************************
 * @UPDATE_COUPON
 * @route PUT  <URL>/api/coupon/:id
 * @description Controller used for updating coupon status
 * @description Only the admin and Moderator can update the coupon status
 * @returns Updated Coupon Object with success message "Coupon Updated"
 *********************************************************/
export const updateCouponStatus = asyncHandler(async (req, res) => {
  const { id: couponId } = req.params;
  const { action } = req.body;

  // action is a boolean or not
  const coupon = await Coupon.findByIdAndUpdate(
    couponId,
    {
      active: action,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!coupon) {
    throw new CustomError("Coupon not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Coupon updated",
    coupon,
  });
});

/**********************************************************
 * @DELETE_COUPON
 * @route DELETE  <URL>/api/coupon/:id
 * @description Controller used for deleting a coupon
 * @description Only the admin and Moderator can delete the coupon
 * @returns Success message "Coupon Deleted"
 *********************************************************/
export const deleteCoupon = asyncHandler(async (req, res) => {
  const { id: couponId } = req.params;
  const coupon = await Coupon.findByIdAndDelete(couponId);

  if (!coupon) {
    throw new CustomError("Coupon not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Coupon deleted",
  });
});

/**********************************************************
 * @GET_ALL_COUPONS
 * @route GET  <URL>/api/coupon/
 * @description Controller used to get all coupons
 * @returns Array of all available coupons
 *********************************************************/
export const getAllCoupons = asyncHandler(async (_req, res) => {
  const allCoupons = await Coupon.find();
  if (!allCoupons || allCoupons.length === 0) {
    throw new CustomError("No Coupons found", 404);
  }

  res.status(200).json({
    success: true,
    allCoupons,
  });
});
