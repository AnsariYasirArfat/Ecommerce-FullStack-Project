import Wishlist from "../models/wishlist.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";

/**********************************************************
 * @ADD_TO_WISHLIST
 * @route <URL>/api/wishlist/addtowishlist
 * @description Controller used to add product to wishlist
 * @returns Wishlist added Product Object
 *********************************************************/
export const addToWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    throw new CustomError("Please provide User & Product id", 400);
  }
  const wishlistItem = await Wishlist.create({
    userId,
    productId,
  });

  if (!wishlistItem) {
    throw new CustomError("Product failed to added to Wishlist", 400);
  }

  res.status(200).json({
    success: true,
    message: "Product added to Wishlist",
    wishlistItem,
  });
});

/**********************************************************
 * @VIEW_WISHLIST
 * @route <URL>/api/wishlist/
 * @description Controller used to show all wishlist products
 * @returns Wishlist Products Object
 *********************************************************/
export const getWishlist = asyncHandler(async (req, res) => {
  const { userId } = req.param;

  if (!userId) {
    throw new CustomError("Please provide User Id", 400);
  }

  const wishlist = await Wishlist.find({ userId }).populate("productId");

  if (!wishlist) {
    throw new CustomError("Failed to fetch Wishlist data", 400);
  }
  res.status(200).json({
    success: true,
    wishlist,
  });
});

/**********************************************************
 * @REMOVE_FROM_WISHLIST
 * @route <URL>/api/wishlist/deletewishlist
 * @description Controller used to remove wishlist products
 *********************************************************/
export const deleteFromWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    throw new CustomError("Please provide User & Product id", 400);
  }

  const removeProduct = await Wishlist.findOneAndDelete({ userId, productId });
  if (!removeProduct) {
    throw new CustomError("Failed to delete product from wishlist", 400);
  }
  res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
  });
});
