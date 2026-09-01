import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: 'light', enum: ['light', 'dark'] })
  theme: string;

  @Prop({ default: 'id', enum: ['id', 'en'] })
  language: string;

  @Prop({ default: 'Asia/Jakarta' })
  timezone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
