"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const Expense_1 = __importDefault(require("../models/Expense"));
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
const expenseSchema = zod_1.z.object({
    date: zod_1.z.string(),
    amount: zod_1.z.number(),
    currency: zod_1.z.string(),
    category: zod_1.z.string(),
    note: zod_1.z.string().optional(),
});
// ➕ add expense
router.post("/", async (req, res) => {
    const parsed = expenseSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const expense = await Expense_1.default.create({
        ...parsed.data,
        user: req.user.sub,
        date: new Date(parsed.data.date),
    });
    res.status(201).json(expense);
});
// 📋 list expenses
router.get("/", async (req, res) => {
    const expenses = await Expense_1.default.find({ user: req.user.sub })
        .sort({ date: -1 })
        .limit(100);
    res.json(expenses);
});
// ❌ delete
router.delete("/:id", async (req, res) => {
    await Expense_1.default.deleteOne({ _id: req.params.id, user: req.user.sub });
    res.json({ ok: true });
});
exports.default = router;
