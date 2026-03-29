import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/product.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema.js";

const router = Router();

router.use(authenticate);

router.post("/", validate(createProductSchema), create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", validate(updateProductSchema), update);
router.delete("/:id", remove);

export default router;
