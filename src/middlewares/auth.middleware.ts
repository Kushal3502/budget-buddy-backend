import { NextFunction, Request, Response } from "express";
import ApiResponse from "../utils/apiResponse";
import { verifyAccessToken } from "../utils/jwt";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  // Check for Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json(new ApiResponse(401, "Access token missing or malformed"));
  }

  const accessToken = authHeader.split(" ")[1];

  try {
    // validate accesstoken
    const user = verifyAccessToken(accessToken);

    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Invalid or expired access token"));
    }

    req.user = user.userId;

    next();
  } catch (error: any) {
    console.log("Auth middleware error :: ", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Internal server error"));
  }
}
