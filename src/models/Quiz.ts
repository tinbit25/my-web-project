// src/models/Quiz.ts
import mongoose, { Schema } from 'mongoose';
import { IQuiz } from './interfaces';

const QuestionSchema = new Schema({
  type: { type: String, enum: ['mc', 'tf', 'fib'], required: true },
  question: { type: String, required: true },
  options: [{ type: String }],
  answer: { type: Schema.Types.Mixed, required: true },
});

const QuizSchema = new Schema<IQuiz>(
  {
    title: { type: String, required: true, trim: true },
    gradeNumber: { type: Number, required: true },
    courseTitle: { type: String },
    church: { type: Schema.Types.ObjectId, ref: 'Church' },
    questions: [QuestionSchema],
    timeLimitMinutes: { type: Number, default: 30 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Quiz = mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
export default Quiz;
