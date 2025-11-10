// import { Router } from 'express';
// import { z } from 'zod';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';

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
import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken'; // ✅ added SignOptions type
import User from '../models/User';

const router = Router();

// ✅ Validation schema for registration
const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  currency: z.string().default('INR'),
});

router.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { email, name, password, currency } = parsed.data;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, passwordHash, currency });

  res.status(201).json({ id: user.id, email, name });
});

// ✅ Validation schema for login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error.flatten());

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  // ✅ Prepare payload and JWT options
  const payload = { sub: user.id, role: user.role };
  const secret = process.env.JWT_ACCESS_SECRET as string; // ensure it's treated as string
  // const options: SignOptions = { expiresIn: process.env.ACCESS_TOKEN_TTL || '15m' };
  const options: SignOptions = { expiresIn: (process.env.ACCESS_TOKEN_TTL || '15m') as any };


  // ✅ Properly typed JWT signing
  const token = jwt.sign(payload, secret, options);

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

export default router;
