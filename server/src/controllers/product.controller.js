import Product from "../models/product.model.js";
import mongoose from "mongoose";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";
import formidable from "formidable";
// import { storageRef } from "../services/firebaseInit.js";
import fs from "fs";

import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from "firebase/storage";
import firebaseConfig from "../config/firebase.config.js";

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

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

    if (!name || !price || !description || !stock) {
      throw new CustomError("Please fill all required fields", 500);
    }

    const imageUrls = await Promise.all(
      Object.keys(files).map(async (file, index) => {
        const element = files[file];
        console.log("element", element);

        try {
          const data = fs.readFileSync(element[0].filepath);
          console.log("Data of images", data);

          // Get the file extension from the original filename
          const fileExtension = element[0].originalFilename.split(".").pop();

          const fileName = `products/${productId}/${name[0]}_photo_${
            index + 1
          }.${fileExtension}`;
          console.log("File Name", fileName);
          const imageRef = ref(storage, fileName);
          const snapshot = await uploadBytes(imageRef, data);
          const imageUrl = await getDownloadURL(snapshot.ref);
          return { imageUrl: imageUrl };
        } catch (err) {
          console.error("Error reading file:", err);
          throw new CustomError(
            err.message || "Error reading image files",
            500
          );
        }
      })
    );
    console.log(imageUrls);
    const product = await Product.create({
      _id: productId,
      name: name[0],
      description: description[0],
      price: parseInt(price[0]),
      brand: brand[0],
      category: category[0],
      stock: parseInt(stock[0]),
      isFeatured: Boolean(isFeatured[0]),
      photos: imageUrls,
    });
    if (!product) {
      throw new CustomError("Product failed to be created in DB", 400);
    }
    res.status(200).json({
      success: true,
      message:
        "files uploaded to firebase storage and product details added to mongodb",
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

  /**
   * Deleting files individually with exact file name
   */
  // const photoDeletion = Promise.all(
  //   product.photos.map((photo, index) => {
  //     try {
  //       const fileName = `products/${productId}/${product.name}_photo_${
  //         index + 1
  //       }.jpg`;
  //       const photoRef = ref(storage, fileName);
  //       return deleteObject(photoRef);
  //     } catch (err) {
  //       console.error("Error deleting file:", err);
  //       throw new CustomError("Error deleting image files", 500);
  //     }
  //   })
  // );
  // await photoDeletion;

  /**
   * Deleting whole folder of files of the product
   */
  // Get the folder reference in Firebase Storage
  const folderRef = ref(storage, `products/${productId}/`);

  // List all the items (files) inside the folder
  const listResult = await listAll(folderRef);

  // Delete all the files inside the folder
  const fileDeletion = Promise.all(
    listResult.items.map((itemRef) => deleteObject(itemRef))
  );

  // Delete the folder itself
  await fileDeletion;

  // Delete the product from MongoDB
  await Product.findByIdAndDelete(productId);

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
