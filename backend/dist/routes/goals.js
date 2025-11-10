"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const Goal_1 = __importDefault(require("../models/Goal"));
const router = (0, express_1.Router)();
router.use(auth_1.requireAuth);
const goalSchema = zod_1.z.object({
    title: zod_1.z.string(),
    targetAmount: zod_1.z.number(),
    currentAmount: zod_1.z.number().default(0),
    deadline: zod_1.z.string(),
});
// ➕ Create
router.post("/", async (req, res) => {
    const parsed = goalSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const goal = await Goal_1.default.create({
        ...parsed.data,
        user: req.user.sub,
        deadline: new Date(parsed.data.deadline),
    });
    res.status(201).json(goal);
});
// 📋 List
router.get("/", async (req, res) => {
    const goals = await Goal_1.default.find({ user: req.user.sub }).sort({ createdAt: -1 });
    res.json(goals);
});
exports.default = router;
