// src/models/interfaces.ts
import { Document, Types } from 'mongoose';

export type Role = 'superadmin' | 'churchadmin' | 'teacher' | 'student' | 'parent';

export interface IChurch extends Document {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  church: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudent extends Document {
  user: Types.ObjectId;
  grade: Types.ObjectId;
  parent: Types.ObjectId;
  enrolledCourses: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IParent extends Document {
  user: Types.ObjectId;
  children: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeacher extends Document {
  user: Types.ObjectId;
  courses: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IGrade extends Document {
  name: string;
  order: number;
}

export interface ICourse extends Document {
  title: string;
  description?: string;
  grade: Types.ObjectId;
  teacher: Types.ObjectId;
  lessons: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILesson extends Document {
  title: string;
  content?: string;
  course: Types.ObjectId;
  order: number;
  pdfs: Types.ObjectId[];
  videos: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPdf extends Document {
  title: string;
  url: string;
  lesson: Types.ObjectId;
  createdAt: Date;
}

export interface IEvent extends Document {
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  church: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  church: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface INotification extends Document {
  user: Types.ObjectId;
  title: string;
  body: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuiz extends Document {
  title: string;
  course: Types.ObjectId;
  questions: Types.ObjectId[];
  published: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion extends Document {
  quiz: Types.ObjectId;
  text: string;
  options: string[];
  correctOptionIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuizAttempt extends Document {
  quiz: Types.ObjectId;
  student: Types.ObjectId;
  answers: {
    question: Types.ObjectId;
    selectedOptionIndex: number;
    isCorrect: boolean;
  }[];
  score: number;
  startedAt: Date;
  finishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttendance extends Document {
  lesson: Types.ObjectId;
  student: Types.ObjectId;
  present: boolean;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDiscussionPost extends Document {
  lesson: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  parentPost?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMezmur extends Document {
  title: string;
  lyrics: string;
  audioUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMedia extends Document {
  title: string;
  url: string;
  type: 'image' | 'video' | 'audio';
  lesson?: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
