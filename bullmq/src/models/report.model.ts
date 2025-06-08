import { Schema, model } from 'mongoose';

const reportSchema = new Schema({
  userEmail: String,
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  result: String,
  startedAt: { type: Date, default: Date.now },
  completedAt: Date,
});

export const Report = model('Report', reportSchema);
