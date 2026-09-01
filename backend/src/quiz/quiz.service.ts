import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';
import { UserQuizAttempt, UserQuizAttemptDocument } from '../schemas/user-quiz-attempt.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
    @InjectModel(UserQuizAttempt.name) private attemptModel: Model<UserQuizAttemptDocument>,
  ) {}

  // Monday 00:00 WIB Cron Reset check logger
  @Cron(CronExpression.EVERY_WEEK)
  handleMondayReset() {
    console.log('⏰ [Cron] Monday 00:00 WIB: Weekly Quiz Cycle Reset Check Completed.');
  }

  private getCurrentWeekNumber(): number {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60000;
    const oneWeek = 604800000;
    return Math.ceil((diff + start.getDay() * 86400000) / oneWeek) || 1;
  }

  async getCurrentQuiz() {
    const currentYear = new Date().getFullYear();
    const currentWeek = this.getCurrentWeekNumber();

    // Try finding quiz for current week or fallback to latest quiz in collection
    let quiz = await this.quizModel.findOne({ year: currentYear, weekNumber: currentWeek }).lean();
    if (!quiz) {
      quiz = await this.quizModel.findOne().sort({ year: -1, weekNumber: -1 }).lean();
    }

    if (!quiz) {
      throw new NotFoundException('No quiz available for current week');
    }

    // Hide answers from client response
    const sanitizedQuestions = quiz.questions.map((q) => {
      const { correctAnswer, ...rest } = q;
      return rest;
    });

    return {
      id: quiz._id,
      weekNumber: quiz.weekNumber,
      year: quiz.year,
      resetDay: quiz.resetDay,
      totalQuestions: quiz.questions.length,
      questions: sanitizedQuestions,
    };
  }

  async submitQuizAttempt(userId: string, quizId: string, userAnswers: { questionId: string; userAnswer: string }[]) {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(quizId)) {
      throw new NotFoundException('Invalid user or quiz ID');
    }

    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    let correctCount = 0;
    const processedAnswers = userAnswers.map((ua) => {
      const q = quiz.questions.find((question) => question.id === ua.questionId);
      let isCorrect = false;

      if (q) {
        if (Array.isArray(q.correctAnswer)) {
          isCorrect = q.correctAnswer.some((ans) => ans.trim().toLowerCase() === ua.userAnswer.trim().toLowerCase());
        } else {
          isCorrect = q.correctAnswer.trim().toLowerCase() === ua.userAnswer.trim().toLowerCase();
        }
      }

      if (isCorrect) {
        correctCount++;
      }

      return {
        questionId: ua.questionId,
        userAnswer: ua.userAnswer,
        isCorrect,
        explanation: q?.explanation || '',
      };
    });

    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    const attempt = await this.attemptModel.create({
      userId: new Types.ObjectId(userId),
      quizId: new Types.ObjectId(quizId),
      score,
      totalQuestions,
      answers: processedAnswers,
      weekNumber: quiz.weekNumber,
      attemptedAt: new Date(),
    });

    return {
      attemptId: attempt._id,
      score,
      totalQuestions,
      correctCount,
      answers: processedAnswers,
    };
  }

  async getUserQuizHistory(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid user ID');
    }

    return this.attemptModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('quizId', 'weekNumber year')
      .sort({ attemptedAt: -1 })
      .lean();
  }
}
