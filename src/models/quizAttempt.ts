// src/models/quizAttempt.ts
import { Schema, model, Types } from 'mongoose';
import { IQuizAttempt } from './interfaces';

const AnswerSchema = new Schema({
  question: { type: Types.ObjectId, ref: 'Question', required: true },
  selectedOptionIndex: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true },
});

const QuizAttemptSchema = new Schema<IQuizAttempt>({
  quiz: { type: Types.ObjectId, ref: 'Quiz', required: true },
  student: { type: Types.ObjectId, ref: 'Student', required: true },
  answers: [AnswerSchema],
  score: { type: Number, required: true, min: 0, max: 100 },
  startedAt: { type: Date, default: Date.now },
  finishedAt: { type: Date, required: true },
}, { timestamps: true });

QuizAttemptSchema.index({ quiz: 1, student: 1 });

export const QuizAttempt = model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema);
export default QuizAttempt;
