import { Router } from "express";
import {
  fetchAllCategories,
  handleCreateCategory,
  handleDeleteCategory,
} from "./category.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const categoryRoutes = Router();

categoryRoutes.get("/", authMiddleware, fetchAllCategories);
categoryRoutes.post("/", authMiddleware, handleCreateCategory);
categoryRoutes.delete("/:id", authMiddleware, handleDeleteCategory);
