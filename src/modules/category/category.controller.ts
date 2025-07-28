import { Request, Response } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "./category.service";
import ApiResponse from "../../utils/apiResponse";
import { readFile } from "fs";

export async function fetchAllCategories(req: Request, res: Response) {
  const id = req?.user;

  try {
    const data = await getAllCategories(id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Categories fetched successfully!", data));
  } catch (error: any) {
    console.log("Category fetch error :: ", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Something went wrong."));
  }
}

export async function handleCreateCategory(req: Request, res: Response) {
  const { name } = req.body;
  const id = req?.user;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, "User not authenticated!"));
  }

  try {
    const data = await createCategory(id, name);

    return res
      .status(201)
      .json(new ApiResponse(201, "Category created successfully!", data));
  } catch (error: any) {
    console.log("Category create error :: ", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Something went wrong."));
  }
}

export async function handleDeleteCategory(req: Request, res: Response) {
  const userId = req.user!;
  const { id } = req.params;

  try {
    await deleteCategory(id, userId);

    return res
      .status(200)
      .json(new ApiResponse(200, "Category deleted successfully!"));
  } catch (error: any) {
    console.log("Category delete error :: ", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Something went wrong."));
  }
}
