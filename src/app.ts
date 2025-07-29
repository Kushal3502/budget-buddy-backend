import express from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { categoryRoutes } from "./modules/category/category.route";
import { expenseRoutes } from "./modules/expenses/expense.route";

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
app.use("/api/v1/expenses", expenseRoutes);

export default app;
