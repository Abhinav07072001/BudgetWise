import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import expenseRoutes from "./routes/expenses";
import budgetRoutes from "./routes/budgets";
import goalRoutes from "./routes/goals";
import analyticsRoutes from "./routes/analytics";




const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// simple health route
app.get('/health', (_req, res) => {
  const states = ['disconnected','connected','connecting','disconnecting'] as const;
  // const state = states[mongoose.connection.readyState] ?? 'unknown';
  const state = states[mongoose.connection.readyState as number] ?? "unknown";
  res.json({ ok: true, db: state });
});

// Routes
app.use('/auth', authRoutes);
app.use("/expenses", expenseRoutes);
app.use("/budgets", budgetRoutes);
app.use("/goals", goalRoutes);
app.use("/analytics", analyticsRoutes);

const PORT = process.env.PORT || 8080;

async function start() {
  const uri = process.env.MONGO_URI;
  if (uri) {
    try {
      await mongoose.connect(uri);
      console.log('Mongo connected');
    } catch (err: any) {
      console.error('Mongo connection failed:', err.message);
    }
  } else {
    console.warn('⚠️  MONGO_URI not set — running without DB for now');
  }


  app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
}

start();
