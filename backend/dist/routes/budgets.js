"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const Budget_1 = __importDefault(require("../models/Budget"));
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
const budgetSchema = zod_1.z.object({
    category: zod_1.z.string(),
    limit: zod_1.z.number(),
    period: zod_1.z.string().default("monthly"),
});
// ➕ Create
router.post("/", async (req, res) => {
    const parsed = budgetSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const budget = await Budget_1.default.create({ ...parsed.data, user: req.user.sub });
    res.status(201).json(budget);
});
// 📋 List
router.get("/", async (req, res) => {
    const budgets = await Budget_1.default.find({ user: req.user.sub }).sort({ createdAt: -1 });
    res.json(budgets);
});
exports.default = router;
