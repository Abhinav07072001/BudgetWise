import mongoose, { Schema, Types } from "mongoose";

export interface IGoal {
  user: Types.ObjectId;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
}

const goalSchema = new Schema<IGoal>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGoal>("Goal", goalSchema);
