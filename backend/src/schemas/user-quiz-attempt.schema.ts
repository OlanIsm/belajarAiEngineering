import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserQuizAttemptDocument = UserQuizAttempt & Document;

export class UserAnswer {
  @Prop({ required: true })
  questionId: string;

  @Prop({ required: true })
  userAnswer: string;

  @Prop({ required: true })
  isCorrect: boolean;
}

@Schema({ timestamps: true, collection: 'userQuizAttempts' })
export class UserQuizAttempt {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true })
  quizId: Types.ObjectId;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  totalQuestions: number;

  @Prop({ type: Array, default: [] })
  answers: UserAnswer[];

  @Prop({ default: Date.now })
  attemptedAt: Date;

  @Prop({ required: true })
  weekNumber: number;
}

export const UserQuizAttemptSchema = SchemaFactory.createForClass(UserQuizAttempt);
