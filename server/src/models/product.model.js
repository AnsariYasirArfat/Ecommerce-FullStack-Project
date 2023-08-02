const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " please provide a product name "],
      trim: true,
      maxLength: [120, " Product name should not be max than 120 chars"],
    },
    description: {
      type: String,
      //   required: true,
    },
    price: {
      type: Number,
      required: [true, " please provide a product price "],
      min: 0,
      //   maxLength: [5, " Product name should not be max than 5 chars"],
    },
    brand: {
      type: String,
      //   required: true,s
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    photos: [
      {
        imageUrl: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      //   required: true,
      min: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
