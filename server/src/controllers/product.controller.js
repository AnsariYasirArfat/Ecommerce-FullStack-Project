import Product from "../models/product.model.js";
import mongoose from "mongoose";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";
import formidable from "formidable";
import { storage } from "../services/firebaseInit.js";

/**********************************************************
 * @ADD_PRODUCT
 * @route <URL>/api/product
 * @description Controller used for creating a new product
 * @description Uses Firebase Bucket for image upload
 * @returns Product Object
 *********************************************************/

export const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });
  form.parse(req, async function (err, fields, files) {
    if (err) {
      throw new CustomError(err.message || "Something went wrong", 500);
    }
    let productId = new mongoose.Types.ObjectId().toHexString();
    console.log(fields, files);

    const { name, description, price, brand, category, stock, isFeatured } =
      fields;

    if (!name || !price || !description || !category || !stock) {
      throw new CustomError("Please fill all required fields", 500);
    }

    const storageRef = storage.ref();
    const imageUrls = await Promise.all(
      Object.keys(files).map(async (file, index) => {
        const element = files[fileKey];
        console.log(element);
        const data = fs.readFileSync(element.filepath);

        const fileName = `products/${productId}/photo_${index + 1}.png`;
        const imageRef = storageRef.child(fileName);
        const snapshot = await imageRef.put(data);
        const imageUrl = await snapshot.ref.getDownloadURL();
        return { secure_url: imageUrl };
      })
    );
    const product = await Product.create({
      _id: productId,
      name,
      description,
      price,
      brand,
      category: mongoose.Types.ObjectId(category),
      stock,
      isFeatured,
      photos: imageUrls,
    });
    if (!product) {
      throw new CustomError("Product failed to be created in DB", 400);
    }
    res.status(200).json({
      success: true,
      product,
    });
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  //   if (!mongoose.isValidObjectId(productId)) {
  //     throw new CustomError("Invalid product ID", 400);
  //   }

  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  const storageRef = storage.ref();

  const photoDeletion = Promise.all(
    product.photos.map((photo) => {
      const photoRef = storageRef.child(photo.imageUrl);
      return photoRef.delete();
    })
  );
  await photoDeletion;

  // Delete the product from MongoDB
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product has been deleted successfully",
  });
});

export const getALLProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new CustomError("No products found", 404);
  }

  res.status(200).json({
    success: true,
    products,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("No product found", 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

export const getProductByCategoryId = asyncHandler(async (req, res) => {
  const { id: category } = req.params;
  const products = await Product.find({ category });

  if (!products) {
    throw new CustomError("No products found", 404);
  }

  res.status(200).json({
    success: true,
    products,
  });
});
