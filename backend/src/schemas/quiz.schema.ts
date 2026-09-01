import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuizDocument = Quiz & Document;

export class QuizQuestion {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, enum: ['mcq', 'shortAnswer', 'codeFill', 'matching'] })
  type: string;

  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], default: [] })
  options?: string[];

  @Prop({ type: Object, required: true })
  correctAnswer: string | string[];

  @Prop({ required: true })
  explanation: string;

  @Prop({ default: 'Medium', enum: ['Easy', 'Medium', 'Hard'] })
  difficulty: string;
}

@Schema({ timestamps: true })
export class Quiz {
  @Prop({ required: true })
  weekNumber: number;

  @Prop({ required: true })
  year: number;

  @Prop({ type: Array, required: true })
  questions: QuizQuestion[];

  @Prop({ default: 'Monday' })
  resetDay: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
