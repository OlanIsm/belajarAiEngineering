import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] })
  difficulty: string;

  @Prop({ default: '📘' })
  icon: string;

  @Prop({ default: 1 })
  order: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
