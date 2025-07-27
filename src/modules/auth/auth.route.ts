import { Router } from "express";
import {
  currentUser,
  handleLogin,
  handleLogout,
  handleRegister,
  refreshAccessToken,
} from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const authRoutes = Router();

authRoutes.post("/register", handleRegister);
authRoutes.post("/login", handleLogin);
authRoutes.post("/logout", authMiddleware, handleLogout);
authRoutes.get("/refresh", authMiddleware, refreshAccessToken);
authRoutes.get("/me", authMiddleware, currentUser);
