import { Router } from "express";
import {
  hadleFetchAll,
  handleAddExpense,
  handleDeleteExpense,
  handleFetchById,
  handleUpdateExpense,
} from "./expense.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const expenseRoutes = Router();

expenseRoutes.use(authMiddleware);

expenseRoutes.post("/", handleAddExpense);
expenseRoutes.get("/", hadleFetchAll);
expenseRoutes.get("/:expenseId", handleFetchById);
expenseRoutes.put("/:expenseId", handleUpdateExpense);
expenseRoutes.delete("/:expenseId", handleDeleteExpense);
