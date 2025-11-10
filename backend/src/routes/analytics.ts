import { Router } from "express";
import mongoose from "mongoose";
import { requireAuth } from "../middleware/auth";
import Expense from "../models/Expense";
import Budget from "../models/Budget";
import Goal from "../models/Goal";

const router = Router();
router.use(requireAuth);

// 🧮 Total expenses summary
// router.get("/summary", async (req: any, res) => {
//   const userId = req.user!.sub;

//   const total = await Expense.aggregate([
//     { $match: { user: userId } },
//     { $group: { _id: null, total: { $sum: "$amount" } } },
//   ]);

//   const totalExpenses = total[0]?.total || 0;

//   const budgets = await Budget.find({ user: userId });
//   const goals = await Goal.find({ user: userId });

//   res.json({ totalExpenses, budgets, goals });
// });


// 🧮 Summary route (fixed)
router.get("/summary", async (req: any, res) => {
  const userId = req.user!.sub;
  const objectId = new mongoose.Types.ObjectId(userId); // ✅ convert to ObjectId

  const total = await Expense.aggregate([
    { $match: { user: objectId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalExpenses = total[0]?.total || 0;
  const budgets = await Budget.find({ user: userId });
  const goals = await Goal.find({ user: userId });

  res.json({ totalExpenses, budgets, goals });
});



// 📊 Category breakdown
// router.get("/categories", async (req: any, res) => {
//   const userId = req.user!.sub;
//   const data = await Expense.aggregate([
//     { $match: { user: userId } },
//     { $group: { _id: "$category", total: { $sum: "$amount" } } },
//     { $project: { _id: 0, category: "$_id", total: 1 } },
//   ]);
//   res.json(data);
// });
router.get("/categories", async (req: any, res) => {
  const userId = req.user!.sub;

  // ✅ convert userId string to ObjectId
  const objectId = new mongoose.Types.ObjectId(userId);

  const data = await Expense.aggregate([
    { $match: { user: objectId } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $project: { _id: 0, category: "$_id", total: 1 } },
  ]);

  res.json(data);
});

export default router;
