import { Router } from "express";
import {
  fetchAllCategories,
  handleCreateCategory,
  handleDeleteCategory,
} from "./category.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const categoryRoutes = Router();

categoryRoutes.use(authMiddleware);

categoryRoutes.get("/", fetchAllCategories);
categoryRoutes.post("/", handleCreateCategory);
categoryRoutes.delete("/:id", handleDeleteCategory);
