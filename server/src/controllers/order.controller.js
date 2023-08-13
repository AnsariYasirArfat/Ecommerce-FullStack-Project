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
      const { productId, quantity } = cartProduct;
      const productFromDB = await Prodouct.findById(productId);
      if (!productFromDB) {
        throw new CustomError("No product found", 400);
      }
      if (productFromDB.stock < quantity) {
        return res.status(400).json({
          error: `Quantity of ${productFromDB.name} Product is not in stock`,
        });
      }
      totalAmount += productFromDB.price * quantity;
    })
  );
  await productPriceCalc;
  console.log("Without Any discount", totalAmount);

  // Apply coupon code discount, if available
  if (couponCode) {
    const couponCodeAvailable = await Coupon.findOne({ code: couponCode });
    if (!couponCodeAvailable) {
      throw new CustomError("Invalid coupon", 400);
    }
    if (couponCodeAvailable.active) {
      // Calculate the discount based on the percentage
      const discountAmount = (totalAmount * couponCodeAvailable.discount) / 100;

      // Subtract the discount amount from the total amount
      totalAmount -= discountAmount;
    } else {
      throw new CustomError("Coupon is not active", 400);
    }
    console.log("Total amount after coupon discount: ", totalAmount);
  }

  const options = {
    amount: Math.round(totalAmount * 100),
    currency: "INR",
    receipt: `receipt_${new Date().getTime()}`,
  };
  console.log("Option Object: ", options);

  // Create the order on Razorpay and get the order ID
  razorpay.orders.create(options, function (err, order) {
    if (err) {
      console.error("Razorpay Order Creation Error:", err.error.description);
      res.send({
        success: false,
        message: "Razorpay Order Creation Error:",
        data: err,
      });
    }

    console.log("Order Object form razorpay", order);
    res.status(200).json({
      success: true,
      message: "Razorpay order ID generated successfully",
      orderId: order.id, // Return the Razorpay order ID to the client
    });
  });
});

/*********************************************************
 * @GENERATE_ORDER
 * @route POST <URL>/api/order/generate
 * @description Controller used for generating a new order
 * @returns Generated Order
 *********************************************************/
export const generateOrder = asyncHandler(async (req, res) => {
  const { transactionId, cartProducts, coupon, amount, phoneNumber, address } =
    req.body;
  const userId = req.user._id;

  // Create the order in your database
  const newOrder = await Order.create({
    userId,
    productId: cartProducts.map((cartProduct) => ({
      productId: cartProduct._id,
      // quantity: cartProduct.quantity,
      // price: cartProduct.price,
    })),
    address,
    phoneNumber,
    amount,
    coupon,
    transactionId,
    status: "ORDERED",
  });

  if (!newOrder) {
    throw new CustomError("Order not created", 400);
  }

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
  const userId = req.user._id;

  // Fetch orders for the specific user
  const userOrders = await Order.find({ userId }).populate({
    path: "productId.productId",
    model: "Shopcart",
  });

  if (!userOrders) {
    throw new CustomError("Failed to fetch user orders", 500);
  }

  res.status(200).json({
    success: true,
    myOrders: userOrders,
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
  const allOrders = await Order.find().populate({
    path: "productId.productId",
    model: "Shopcart",
  });

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
    order,
  });
});
