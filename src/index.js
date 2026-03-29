import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Demasiadas solicitudes, intenta de nuevo más tarde" },
});

app.use(cors());
app.use(limiter);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "CRUD Backend API", status: "running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
