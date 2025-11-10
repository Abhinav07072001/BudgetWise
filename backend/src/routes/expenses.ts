import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import Expense from "../models/Expense";

const router = Router();
router.use(requireAuth);

const expenseSchema = z.object({
  date: z.string(),
  amount: z.number(),
  currency: z.string(),
  category: z.string(),
  note: z.string().optional(),
});

// ➕ add expense
router.post("/", async (req: any, res) => {
  const parsed = expenseSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const expense = await Expense.create({
    ...parsed.data,
    user: req.user!.sub,
    date: new Date(parsed.data.date),
  });
  res.status(201).json(expense);
});

// 📋 list expenses
router.get("/", async (req: any, res) => {
  const expenses = await Expense.find({ user: req.user!.sub })
    .sort({ date: -1 })
    .limit(100);
  res.json(expenses);
});

// ❌ delete
router.delete("/:id", async (req: any, res) => {
  await Expense.deleteOne({ _id: req.params.id, user: req.user!.sub });
  res.json({ ok: true });
});

export default router;
