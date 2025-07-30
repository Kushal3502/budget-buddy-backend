import { Router } from "express";
import {
  handleFetchExpenseByCategory,
  handleFetchExpenseByMonth,
} from "./dashboard.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const dashboardRoutes = Router();

dashboardRoutes.use(authMiddleware);

dashboardRoutes.get("/month", handleFetchExpenseByMonth);
dashboardRoutes.get("/category", handleFetchExpenseByCategory);
