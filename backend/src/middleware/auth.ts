import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface JWTPayload {
  sub: string;
  role: 'user' | 'admin';
}

export function requireAuth(
  req: Request & { user?: JWTPayload },
  res: Response,
  next: NextFunction
) {
  const token =
    req.cookies['access_token'] ||
    (req.headers.authorization?.split(' ')[1] ?? '');

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JWTPayload;
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
