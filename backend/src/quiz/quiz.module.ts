import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { Quiz, QuizSchema } from '../schemas/quiz.schema';
import { UserQuizAttempt, UserQuizAttemptSchema } from '../schemas/user-quiz-attempt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: UserQuizAttempt.name, schema: UserQuizAttemptSchema },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
