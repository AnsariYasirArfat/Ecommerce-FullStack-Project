import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a collection name"],
      unique: true,
      trim: true,
      maxLength: [120, "Collection name should not be more than 120 chars"],
    },
    description: {
      type: String,
      // required: true,
    },
    imageUrl: {
      type: String,
      // required: true,
    },
    // products: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
