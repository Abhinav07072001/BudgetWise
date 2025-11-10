"use strict";
// import { Router } from 'express';
// import { z } from 'zod';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// const registerSchema = z.object({
//   email: z.string().email(),
//   name: z.string().min(2),
//   password: z.string().min(6),
//   currency: z.string().default('INR')
// });
// router.post('/register', async (req, res) => {
//   const parsed = registerSchema.safeParse(req.body);
//   if (!parsed.success) return res.status(400).json(parsed.error.flatten());
//   const { email, name, password, currency } = parsed.data;
//   const exists = await User.findOne({ email });
//   if (exists) return res.status(409).json({ error: 'Email already registered' });
//   const passwordHash = await bcrypt.hash(password, 10);
//   const user = await User.create({ email, name, passwordHash, currency });
//   res.status(201).json({ id: user.id, email, name });
// });
// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6)
// });
// router.post('/login', async (req, res) => {
//   const parsed = loginSchema.safeParse(req.body);
//   if (!parsed.success) return res.status(400).json(parsed.error.flatten());
//   const { email, password } = parsed.data;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ error: 'Invalid credentials' });
//   const ok = await bcrypt.compare(password, user.passwordHash);
//   if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
//   const payload = { sub: user.id, role: user.role };
//   const token = jwt.sign(payload,  process.env.JWT_ACCESS_SECRET as string, {
//     expiresIn: process.env.ACCESS_TOKEN_TTL || '15m'
//   });
//   res.cookie('access_token', token, {
//     httpOnly: true,
//     sameSite: 'lax',
//     secure: false,
//     maxAge: 15 * 60 * 1000
//   });
//   res.json({
//     token,
//     user: { id: user.id, email: user.email, name: user.name, currency: user.currency }
//   });
// });
// router.post('/logout', (req, res) => {
//   res.clearCookie('access_token');
//   res.json({ ok: true });
// });
// export default router;
const express_1 = require("express");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // ✅ added SignOptions type
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// ✅ Validation schema for registration
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(2),
    password: zod_1.z.string().min(6),
    currency: zod_1.z.string().default('INR'),
});
router.post('/register', async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const { email, name, password, currency } = parsed.data;
    const exists = await User_1.default.findOne({ email });
    if (exists)
        return res.status(409).json({ error: 'Email already registered' });
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const user = await User_1.default.create({ email, name, passwordHash, currency });
    res.status(201).json({ id: user.id, email, name });
});
// ✅ Validation schema for login
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
router.post('/login', async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json(parsed.error.flatten());
    const { email, password } = parsed.data;
    const user = await User_1.default.findOne({ email });
    if (!user)
        return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt_1.default.compare(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ error: 'Invalid credentials' });
    // ✅ Prepare payload and JWT options
    const payload = { sub: user.id, role: user.role };
    const secret = process.env.JWT_ACCESS_SECRET; // ensure it's treated as string
    // const options: SignOptions = { expiresIn: process.env.ACCESS_TOKEN_TTL || '15m' };
    const options = { expiresIn: (process.env.ACCESS_TOKEN_TTL || '15m') };
    // ✅ Properly typed JWT signing
    const token = jsonwebtoken_1.default.sign(payload, secret, options);
    // ✅ Secure cookie
    res.cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // change to true if using HTTPS
        maxAge: 15 * 60 * 1000,
    });
    res.json({
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            currency: user.currency,
        },
    });
});
router.post('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.json({ ok: true });
});
exports.default = router;
