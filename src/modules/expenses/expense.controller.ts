import { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse";
import {
  addExpense,
  deleteExpense,
  fetchAll,
  fetchById,
  updateExpense,
} from "./expense.service";

export async function handleAddExpense(req: Request, res: Response) {
  const { amount, categoryId, note, date, mode } = req.body;

  const id = req.user!;

  if ([amount, categoryId, mode].some((item) => item === null))
    throw new Error("Fill the required fields!");

  try {
    const data = await addExpense(id, categoryId, note, amount, mode, date);

    if (!data)
      return res.status(400).json(new ApiResponse(400, "Category not found!"));

    return res.status(201).json(new ApiResponse(201, "New expense added!"));
  } catch (error: any) {
    console.log("Add expense error :: ", error.message);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
}

export async function hadleFetchAll(req: Request, res: Response) {
  const id = req.user!;

  try {
    const data = await fetchAll(id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Expenses fetched successfully!", data));
  } catch (error: any) {
    console.log("Fetch expenses error :: ", error.message);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
}

export async function handleFetchById(req: Request, res: Response) {
  const { expenseId } = req.params;
  const userId = req.user!;

  try {
    const data = await fetchById(userId, expenseId);

    return res
      .status(200)
      .json(new ApiResponse(200, "Expense fetched successfully!", data));
  } catch (error: any) {
    console.log("Fetch expense error :: ", error.message);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
}

export async function handleUpdateExpense(req: Request, res: Response) {
  const { expenseId } = req.params;
  const { amount, note, categoryId, mode, date } = req.body;
  const userId = req.user!;

  try {
    const data = await updateExpense(userId, expenseId, {
      amount,
      note,
      mode,
      categoryId,
      date,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Expense updated successfully!", data));
  } catch (error: any) {
    console.log("Update expense error :: ", error);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
}

export async function handleDeleteExpense(req: Request, res: Response) {
  const { expenseId } = req.params;
  const userId = req.user!;

  try {
    await deleteExpense(userId, expenseId);

    return res
      .status(200)
      .json(new ApiResponse(200, "Expense deleted successfully!"));
  } catch (error: any) {
    console.log("Delete expense error :: ", error.message);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
}
