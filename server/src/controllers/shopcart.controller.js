import Shopcart from "../models/shopcart.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";

/**********************************************************
 * @ADD_TO_SHOPCART
 * @route <URL>/api/shopcart/addtocart
 * @description Controller used to add product to shopcart
 * @returns Shopcart added Product Object
 *********************************************************/
export const addToShopcart = asyncHandler(async (req, res) => {
  const { user, product, quantity } = req.body;
  if (!user || !product || !quantity) {
    throw new CustomError("Please provide User & Product & quantity", 400);
  }
  // Check if the item already exists in the cart for the user
  let cartProduct = await Shopcart.findOne({ user, product });

  if (cartProduct) {
    cartProduct.quantity += quantity;
    res.status(200).json({
      succuss: true,
      message: "Product already present in shopcart, Quantity added by 1",
      cartProduct,
    });
  } else {
    cartProduct = await Shopcart.create({
      user,
      product,
      quantity,
    });
  }
});

/**********************************************************
 * @VIEW_SHOPCART
 * @route <URL>/api/shopcart/
 * @description Controller used to show all shopcart product
 * @returns Shopcart Product Object
 *********************************************************/
export const getShopCartProducts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new CustomError("Please provide User Id", 400);
  }

  const cartProduct = await Shopcart.find({ user: userId }).populate("product");
  res.status(200).json({
    success: true,
    cartProduct,
  });
});

/**********************************************************
 * @UPDATE_SHOPCART
 * @route <URL>/api/shopcart/updatequantity
 * @description Controller used to update quantity of shopcart products
 * @returns Shopcart Product Object
 *********************************************************/
export const updateShopcartProductQuantity = asyncHandler(async (req, res) => {
  const { cartProductId, quantity } = req.body;
  if (!cartProductId || !quantity) {
    throw new CustomError("Please provide Shopcart Id & quantity to add", 400);
  }
  // Find the shopcart item by its ID
  //   const cartProduct = await Shopcart.findById(cartProductId);
  const cartProduct = await Shopcart.findByIdAndUpdate(
    cartProductId,
    { quantity },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!cartProduct) {
    throw new CustomError("Cart product not found", 404);
  }

  //   cartProduct.quantity = quantity;
  //   await cartProduct.save()

  res.status(200).json({
    success: true,
    message: "Cart product quantity updated",
    cartProduct,
  });
});

/**********************************************************
 * @DELETE_SHOPCART
 * @route <URL>/api/shopcart/:id
 * @description Controller used to delete shopcart product
 * @returns Shopcart Product DELETE
 *********************************************************/
export const deleteShopcartProduct = asyncHandler(async (req, res) => {
  const { cartProductId } = req.params;
  if (!cartProductId) {
    throw new CustomError("Please provide cartItemid");
  }
  const cartItem = await Shopcart.findByIdAndDelete(cartProductId);

  if (!cartItem) {
    throw new CustomError("Cart item not found", 404);
  }
  res.status(200).json({
    success: true,
    message: "Cart item removed",
  });
});
