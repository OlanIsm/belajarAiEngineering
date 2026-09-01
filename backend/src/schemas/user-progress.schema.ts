import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserProgressDocument = UserProgress & Document;

@Schema({ timestamps: true, collection: 'userProgress' })
export class UserProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  courseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ModuleItem', required: true, index: true })
  moduleId: Types.ObjectId;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: Date })
  completedAt?: Date;

  @Prop({ default: 0 })
  progress: number;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);
