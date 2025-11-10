import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import Budget from "../models/Budget";

const router = Router();
router.use(requireAuth);

const budgetSchema = z.object({
  category: z.string(),
  limit: z.number(),
  period: z.string().default("monthly"),
});

// ➕ Create
router.post("/", async (req: any, res) => {
  const parsed = budgetSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const budget = await Budget.create({ ...parsed.data, user: req.user!.sub });
  res.status(201).json(budget);
});

// 📋 List
router.get("/", async (req: any, res) => {
  const budgets = await Budget.find({ user: req.user!.sub }).sort({ createdAt: -1 });
  res.json(budgets);
});

export default router;
