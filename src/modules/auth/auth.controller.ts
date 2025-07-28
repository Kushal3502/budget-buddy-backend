import { Request, Response } from "express";
import ApiResponse from "../../utils/apiResponse";
import { generateAccessToken } from "../../utils/jwt";
import { createNewToken, login, logout, me, register } from "./auth.service";

export async function handleRegister(req: Request, res: Response) {
  const { name, email, age, password } = req.body;

  if (!name || !email || !password) throw new Error("Fill the required fields");

  try {
    const data = await register(name, email, age, password);

    return res
      .status(201)
      .json(new ApiResponse(201, "Account created successfully", data));
  } catch (error: any) {
    console.log("Register user error :: ", error.message);

    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Something went wrong."));
  }
}

export async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("Fill the required fields");

  try {
    const { data, refreshToken } = await login(email, password);

    // set refreshtoken in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, "Login successful!", data));
  } catch (error: any) {
    console.log("Login user error :: ", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Something went wrong."));
  }
}

export async function handleLogout(req: Request, res: Response) {
  const id = req?.user;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, "User not authenticated!"));
  }

  try {
    await logout(id);

    res.clearCookie("refreshToken");
    return res.status(200).json(new ApiResponse(200, "Logout successful!"));
  } catch (error: any) {
    console.log("Logout user error :: ", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Something went wrong."));
  }
}

export async function refreshAccessToken(req: Request, res: Response) {
  const token = req?.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json(new ApiResponse(401, "Refresh token missing!"));
  }

  try {
    const user = await createNewToken(token);

    if (!user || user.refreshToken !== token) {
      return res
        .status(403)
        .json(new ApiResponse(403, "Invalid refresh token"));
    }

    const accessToken = generateAccessToken(user.id);

    return res
      .status(201)
      .json(new ApiResponse(201, "Access token refreshed", { accessToken }));
  } catch (error: any) {
    console.log("Access token create error :: ", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Something went wrong."));
  }
}

export async function currentUser(req: Request, res: Response) {
  const id = req?.user;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, "User not authenticated!"));
  }

  try {
    const data = await me(id);

    return res
      .status(200)
      .json(new ApiResponse(200, "Current user fetched successfully", data));
  } catch (error: any) {
    console.log("Current user fetch error :: ", error.message);
    return res
      .status(500)
      .json(new ApiResponse(500, error.message || "Something went wrong."));
  }
}
