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
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity) {
    throw new CustomError("Please provide Product & quantity", 400);
  }
  // Check if the item already exists in the cart for the user
  let cartProduct = await Shopcart.findOne({ userId, productId });

  if (cartProduct) {
    cartProduct.quantity += quantity;
    cartProduct.save();
    res.status(200).json({
      succuss: true,
      message: `Product already present in shopcart, Quantity added by ${quantity}`,
      cartProduct,
    });
  } else {
    cartProduct = await Shopcart.create({
      userId,
      productId,
      quantity,
    });

    if (!cartProduct) {
      throw new CustomError("Product failed to added to Shoplist", 400);
    }

    res.status(200).json({
      succuss: true,
      message: `Product added to shopcart with Quantity of ${quantity}`,
      cartProduct,
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
  const userId = req.user._id;
  if (!userId) {
    throw new CustomError("You need to login first", 400);
  }

  const cartProduct = await Shopcart.find({ userId }).populate("productId");

  if (!cartProduct) {
    throw new CustomError("Failed to fetch shopcart Product data", 400);
  }

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
  const userId = req.user._id;

  if (!cartProductId || !quantity) {
    throw new CustomError(
      "Please provide Shopcart Product Id & quantity to add",
      400
    );
  }
  // Find the shopcart item by its ID
  //   const cartProduct = await Shopcart.findById(cartProductId);
  const cartProduct = await Shopcart.findByIdAndUpdate(
    { _id: cartProductId, userId },
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
  const { id: cartProductId } = req.params;
  const userId = req.user._id;

  if (!cartProductId) {
    throw new CustomError("Please provide cartProduct Id");
  }
  const cartProduct = await Shopcart.findByIdAndDelete({
    _id: cartProductId,
    userId,
  });

  if (!cartProduct) {
    throw new CustomError("Cart item not found", 404);
  }
  res.status(200).json({
    success: true,
    message: "Cart item removed",
  });
});
