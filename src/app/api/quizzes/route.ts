import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Quiz from '@/models/Quiz';
import QuizAttempt from '@/models/quizAttempt';
import Church from '@/models/Church';
import { broadcastEvent } from '../realtime/route';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const grade = searchParams.get('grade');

    const filter: any = {};
    if (grade) filter.gradeNumber = parseInt(grade, 10);

    const quizzes = await Quiz.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, quizzes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { action, title, gradeNumber, courseTitle, questions, quizId, userAnswers } = body;

    let defaultChurch = await Church.findOne();

    // Grade student submission automatically
    if (action === 'submit' && quizId) {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return NextResponse.json({ success: false, error: 'Quiz not found' }, { status: 404 });
      }

      let score = 0;
      quiz.questions.forEach((q: any, idx: number) => {
        const studentAns = userAnswers[idx];
        if (q.type === 'mc' && Number(studentAns) === Number(q.answer)) score++;
        if (q.type === 'tf' && String(studentAns) === String(q.answer)) score++;
        if (q.type === 'fib' && String(studentAns).toLowerCase().trim() === String(q.answer).toLowerCase().trim()) score++;
      });

      const totalQuestions = quiz.questions.length || 1;
      const scorePct = Math.round((score / totalQuestions) * 100);

      broadcastEvent('QUIZ_COMPLETED', { quizId, scorePct });

      return NextResponse.json({
        success: true,
        scorePct,
        score,
        totalQuestions,
        passed: scorePct >= 60,
      });
    }

    // Create new Quiz
    const newQuiz = await Quiz.create({
      title,
      gradeNumber: parseInt(gradeNumber || '7', 10),
      courseTitle: courseTitle || 'General Studies',
      questions: questions || [],
      church: defaultChurch?._id,
    });

    broadcastEvent('QUIZ_CREATED', newQuiz);

    return NextResponse.json({ success: true, quiz: newQuiz });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
