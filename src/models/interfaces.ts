// src/models/interfaces.ts
import { Document, Types } from 'mongoose';

export type Role = 'superadmin' | 'churchadmin' | 'teacher' | 'student' | 'parent';

export interface IChurch extends Document {
  name: string;
  amharicName?: string;
  patronSaint?: string;
  code: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  email?: string;
  contactEmail?: string;
  logoUrl?: string;
  settings?: {
    theme?: string;
    timezone?: string;
    allowSelfRegistration?: boolean;
  };
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGrade extends Document {
  name: string;
  order: number;
}

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  amharicName?: string;
  gender?: 'male' | 'female';
  dob?: Date;
  phone?: string;
  address?: string;
  baptismName?: string;
  profilePhoto?: string;
  role: Role;
  church: Types.ObjectId;
  isApproved: boolean;
  approvalDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStudentProfile {
  amharicName?: string;
  gender?: string;
  dob?: Date;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  gradeNumber: number;
  address?: string;
  baptismName?: string;
  profilePhoto?: string;
  enrolledCourses?: Types.ObjectId[];
  parentUser?: Types.ObjectId;
}

export interface ITeacherProfile {
  gender?: string;
  phone?: string;
  subjects?: string[];
  assignedGrades?: number[];
  qualification?: string;
  yearsOfExperience?: number;
  biography?: string;
  profilePhoto?: string;
}

export interface IParentProfile {
  phone?: string;
  address?: string;
  children?: Types.ObjectId[]; // User IDs of students
}

export interface ICourse extends Document {
  title: string;
  amharicTitle?: string;
  description?: string;
  gradeNumber: number;
  church: Types.ObjectId;
  teacher?: Types.ObjectId;
  lessons?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILesson extends Document {
  title: string;
  amharicTitle?: string;
  content?: string;
  course: Types.ObjectId;
  order: number;
  pdfUrl?: string;
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPdf extends Document {
  title: string;
  amharicTitle?: string;
  category: string;
  gradeNumber: number;
  courseTitle?: string;
  church: Types.ObjectId;
  url: string;
  fileSize?: string;
  tags?: string[];
  authorName?: string;
  uploadedBy: Types.ObjectId;
  downloadsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDiscussionReply {
  _id?: Types.ObjectId;
  author: Types.ObjectId;
  authorName: string;
  authorRole: Role;
  content: string;
  date: Date;
  verified: boolean;
  likes: number;
  likedBy: Types.ObjectId[];
}

export interface IDiscussionPost extends Document {
  title: string;
  category: string;
  author: Types.ObjectId;
  authorName: string;
  authorRole: Role;
  content: string;
  images?: string[];
  likes: number;
  likedBy: Types.ObjectId[];
  replies: IDiscussionReply[];
  lesson?: Types.ObjectId;
  church: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  _id?: Types.ObjectId;
  type: 'mc' | 'tf' | 'fib';
  question: string;
  options?: string[];
  answer: string | number | boolean;
}

export interface IQuiz extends Document {
  title: string;
  gradeNumber: number;
  courseTitle?: string;
  church: Types.ObjectId;
  questions: IQuestion[];
  timeLimitMinutes?: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuizAttempt extends Document {
  quiz: Types.ObjectId;
  student: Types.ObjectId;
  answers?: {
    question?: Types.ObjectId;
    selectedOptionIndex?: number;
    isCorrect?: boolean;
  }[];
  score: number;
  totalQuestions?: number;
  passed?: boolean;
  startedAt?: Date;
  finishedAt?: Date;
  completedAt?: Date;
}

export interface IAttendanceRecord {
  student: Types.ObjectId;
  studentName: string;
  status: 'present' | 'late' | 'absent';
}

export interface IAttendance extends Document {
  church: Types.ObjectId;
  gradeNumber: number;
  date: Date;
  records: IAttendanceRecord[];
  markedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent extends Document {
  title: string;
  amharicTitle?: string;
  category: 'Retreat' | 'Competition' | 'Graduation' | 'Mahlet' | 'Training' | string;
  dateString: string;
  eventDate?: Date;
  location: string;
  capacity: number;
  registeredUsers: {
    user: Types.ObjectId;
    fullName: string;
    gradeNumber?: number;
    registeredAt: Date;
  }[];
  description: string;
  color: string;
  church: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  church: Types.ObjectId;
  author: Types.ObjectId;
  authorName: string;
  targetRole?: string;
  dateString: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification extends Document {
  user: Types.ObjectId;
  title: string;
  body: string;
  unread: boolean;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}
