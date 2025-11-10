import { Router } from "express";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";
import Goal from "../models/Goal";

const router = Router();
router.use(requireAuth);

const goalSchema = z.object({
  title: z.string(),
  targetAmount: z.number(),
  currentAmount: z.number().default(0),
  deadline: z.string(),
});

// ➕ Create
router.post("/", async (req: any, res) => {
  const parsed = goalSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());
  const goal = await Goal.create({
    ...parsed.data,
    user: req.user!.sub,
    deadline: new Date(parsed.data.deadline),
  });
  res.status(201).json(goal);
});

// 📋 List
router.get("/", async (req: any, res) => {
  const goals = await Goal.find({ user: req.user!.sub }).sort({ createdAt: -1 });
  res.json(goals);
});

export default router;
