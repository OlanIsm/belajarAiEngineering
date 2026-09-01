import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ModuleDocument = ModuleItem & Document;

export class CodeSnippet {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  code: string;
}

@Schema({ timestamps: true, collection: 'modules' })
export class ModuleItem {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  courseId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Array, default: [] })
  codeSnippets: CodeSnippet[];

  @Prop({ default: 5 })
  readingTimeMinutes: number;

  @Prop({ default: 1 })
  order: number;
}

export const ModuleSchema = SchemaFactory.createForClass(ModuleItem);
