import mongoose from "mongoose";
import orderStatus from "../utils/orderStatus.js";

const orderschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shopcart",
          },
        },
      ],
    },
    address: {
      type: String,
      // required: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    coupon: String,
    transactionId: String,
    status: {
      type: String,
      enum: Object.values(orderStatus),
      default: orderStatus.ORDERED,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Order", orderschema);
