import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('current')
  async getCurrentQuiz() {
    return this.quizService.getCurrentQuiz();
  }

  @UseGuards(JwtAuthGuard)
  @Post('submit')
  async submitQuiz(
    @Body() body: { userId: string; quizId: string; answers: { questionId: string; userAnswer: string }[] },
  ) {
    return this.quizService.submitQuizAttempt(body.userId, body.quizId, body.answers);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history/:userId')
  async getQuizHistory(@Param('userId') userId: string) {
    return this.quizService.getUserQuizHistory(userId);
  }
}
