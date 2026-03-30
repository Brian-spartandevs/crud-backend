import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

// Validar variables de entorno críticas al inicio
const REQUIRED_ENV = ["JWT_SECRET", "DATABASE_URL"];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`❌ Variable de entorno requerida no encontrada: ${key}`);
    process.exit(1);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Demasiadas solicitudes, intenta de nuevo más tarde" },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Demasiados intentos de autenticación, intenta de nuevo en 15 minutos" },
});

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(limiter);
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "CRUD Backend API", status: "running" });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
