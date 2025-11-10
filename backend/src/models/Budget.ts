import mongoose, { Schema, Types } from "mongoose";

export interface IBudget {
  user: Types.ObjectId;
  category: string;
  limit: number;
  period: string; // e.g., "monthly", "weekly"
}

const budgetSchema = new Schema<IBudget>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    limit: { type: Number, required: true },
    period: { type: String, default: "monthly" },
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>("Budget", budgetSchema);
