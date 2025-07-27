import express from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// <-------------------- API Routes -------------------->

app.use("/api/v1/auth", authRoutes);

export default app;
