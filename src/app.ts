import express from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { categoryRoutes } from "./modules/category/category.route";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// <-------------------- API Routes -------------------->

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", categoryRoutes);

export default app;
