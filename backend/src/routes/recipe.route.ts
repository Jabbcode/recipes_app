import { Router } from "express";
import {
  findAll,
  findById,
  onCreate,
  onDelete,
  onUpdate,
} from "../controllers/recipe.controller";

const router = Router();

router.get("/", findAll);

router.get("/:id", findById);

router.post("/", onCreate);

router.patch("/update/:id", onUpdate);

router.delete("/delete/:id", onDelete);

export default router;
