import Category from "../models/category.model.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/CustomError.js";

/**
 * Contoller To Create New Category
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;
  if (!name) {
    throw new CustomError("Name of Category is required", 400);
  }
  const category = await Category.create({
    name,
    description,
    imageUrl,
  });

  res.status(200).jsom({
    success: true,
    message: "Category created successfully",
    category,
  });
});

/**
 * Controller To Update Category
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const { id: categoryId } = req.params;
  if (!name) {
    throw new CustomError("Name of Category is required", 400);
  }
  const updateCategory = await Category.findByIdAndUpdate(
    categoryId,
    { name, description, imageUrl },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updateCategory) {
    throw new CustomError("Category not found", 400);
  }

  res.status(200).json({
    success: true,
    message: " Category updated successfully",
    updateCategory,
  });
});

/**
 * To Delete Collection
 */
export const deleteCollection = asyncHandler(async (req, res) => {
  const { id: categoryId } = req.params;
  // const categoryToDelete = await Category.findByIdAndDelete(categoryId)  // Direct Method
  const categoryToDelete = await Category.findById(categoryId);
  if (!categoryToDelete) {
    throw new CustomError("Category to be Deleted not found", 400);
  }
  await categoryToDelete.remove();
  res.status(200).jsom({
    success: true,
    message: "Category deleted successfully",
  });
});

/**
 * To Get all Collections
 */
export const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  if (!categories) {
    throw new CustomError("No Categories found", 400);
  }
  res.status(200).json({
    success: true,
    categories,
  });
});
