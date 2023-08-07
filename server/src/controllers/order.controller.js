import Prodouct from "../models/product.model.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";
import razorpay from "../config/razorpay.config.js";

/**********************************************************
 * @GENERATE_RAZORPAY_ORDER_ID
 * @route POST <URL>/api/order/generate-razorpay-order
 * @description Controller used for generating a new Razorpay order ID
 * @returns Razorpay Order ID
 *********************************************************/
export const generateRazorpayOrderId = asyncHandler(async (req, res) => {
  const { cartProducts, couponCode } = req.body;

  if (!cartProducts || cartProducts.length === 0) {
    throw new CustomError("No products found", 400);
  }

  let totalAmount = 0;

  // Calculate total amount based on product prices and quantities
  let productPriceCalc = Promise.all(
    cartProducts.map(async (cartProduct) => {
      const { product, quantity } = cartProduct;
      const productFromDB = await Prodouct.findById(product);
      if (!productFromDB) {
        throw new CustomError("No product found", 400);
      }
      if (productFromDB.stock < quantity) {
        return res.status(400).json({
          error: "Product quantity not in stock",
        });
      }
      totalAmount += productFromDB.price * quantity;
    })
  );
  await productPriceCalc;

  // Apply coupon code discount, if available
  const couponCodeAvailable = await Coupon.findOne({ code: couponCode });
  if (!couponCodeAvailable) {
    throw new CustomError("Invalid coupon", 400);
  }
  if (couponCodeAvailable.active) {
    totalAmount -= couponCodeAvailable.discount;
  } else {
    throw new CustomError("Coupon is not active", 400);
  }

  const options = {
    amount: Math.round(totalAmount * 100),
    currency: "INR",
    receipt: `receipt_${new Date().getTime()}`,
  };

  // Create the order on Razorpay and get the order ID
  const order = await razorpay.orders.create(options);
  if (!order) {
    throw new CustomError("Unable to generate the order", 400);
  }

  res.status(200).json({
    success: true,
    message: "Razorpay order ID generated successfully",
    orderId: order.id, // Return the Razorpay order ID to the client
  });
});

/*********************************************************
 * @GENERATE_ORDER
 * @route POST <URL>/api/order/generate
 * @description Controller used for generating a new order
 * @returns Generated Order
 *********************************************************/
export const generateOrder = asyncHandler(async (req, res) => {
  const { transactionId, cartProducts, coupon, totalAmount } = req.body;

  // Create the order in your database
  const newOrder = await Order.create({
    user: req.user,
    product: cartProducts.map((cartProduct) => ({
      productId: cartProduct.product,
      quantity: cartProduct.quantity,
      price: cartProduct.price,
    })),
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    amount: totalAmount,
    coupon,
    transactionId,
    status: orderStatus.ORDERED,
  });

  res.status(200).json({
    success: true,
    message: "Order generated and saved successfully",
    order: newOrder,
  });
});

/*********************************************************
 * @GET_MY_ORDERS
 * @route GET <URL>/api/order/my-orders/:userId
 * @description Controller used for fetching orders of a specific user
 * @returns Array of User's Orders
 *********************************************************/
export const getMyOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Fetch orders for the specific user
  const userOrders = await Order.find({ user: userId }).populate("product");

  if (!userOrders) {
    throw new CustomError("Failed to fetch user orders", 500);
  }

  res.status(200).json({
    success: true,
    orders: userOrders,
  });
});

/**********************************************************
 * @GET_ALL_ORDERS
 * @route GET <URL>/api/order/all-orders
 * @description Controller used for fetching all orders (Admin only)
 * @returns Array of All Orders
 *********************************************************/
export const getAllOrders = asyncHandler(async (_req, res) => {
  // Fetch all orders
  const allOrders = await Order.find().populate("product");

  if (!allOrders) {
    throw new CustomError("Failed to fetch all orders", 500);
  }

  res.status(200).json({
    success: true,
    orders: allOrders,
  });
});

/**********************************************************
 * @UPDATE_ORDER_STATUS
 * @route PUT <URL>/api/order/update-status/:orderId
 * @description Controller used for updating the status of an order (Admin only)
 * @returns Updated Order
 *********************************************************/
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  // Find the order by its ID
  const order = await Order.findByIdAndUpdate(orderId, { status });

  if (!order) {
    throw new CustomError("Order not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order: order,
  });
});