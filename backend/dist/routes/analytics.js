"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("../middleware/auth");
const Expense_1 = __importDefault(require("../models/Expense"));
const Budget_1 = __importDefault(require("../models/Budget"));
const Goal_1 = __importDefault(require("../models/Goal"));
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
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
router.get("/summary", async (req, res) => {
    const userId = req.user.sub;
    const objectId = new mongoose_1.default.Types.ObjectId(userId); // ✅ convert to ObjectId
    const total = await Expense_1.default.aggregate([
        { $match: { user: objectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = total[0]?.total || 0;
    const budgets = await Budget_1.default.find({ user: userId });
    const goals = await Goal_1.default.find({ user: userId });
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
router.get("/categories", async (req, res) => {
    const userId = req.user.sub;
    // ✅ convert userId string to ObjectId
    const objectId = new mongoose_1.default.Types.ObjectId(userId);
    const data = await Expense_1.default.aggregate([
        { $match: { user: objectId } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } },
        { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);
    res.json(data);
});
exports.default = router;
