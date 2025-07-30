import { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse";
import { fetchByCategory, fetchByMonth } from "./dashboard.service";

export async function handleFetchExpenseByMonth(req: Request, res: Response) {
  const id = req.user!;

  try {
    const data = await fetchByMonth(id);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Month wise expenses fetched successfully!", data)
      );
  } catch (error: any) {
    console.log("Fetch expense error :: ", error.message);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
}

export async function handleFetchExpenseByCategory(
  req: Request,
  res: Response
) {
  const id = req.user!;

  try {
    const data = await fetchByCategory(id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Category wise expenses fetched successfully!",
          data
        )
      );
  } catch (error: any) {
    console.log("Fetch expense error :: ", error.message);
    return res.status(500).json(new ApiResponse(500, error.message));
  }
}
