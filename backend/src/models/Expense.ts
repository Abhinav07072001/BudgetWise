import mongoose, { Schema, Types } from "mongoose";

export interface IExpense {
  user: Types.ObjectId;
  date: Date;
  amount: number;
  currency: string;
  category: string;
  note?: string;
}

const expenseSchema = new Schema<IExpense>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    category: { type: String, required: true },
    note: String,
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", expenseSchema);
