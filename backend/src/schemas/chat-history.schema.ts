import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatHistoryDocument = ChatHistory & Document;

export class ChatMessage {
  @Prop({ required: true, enum: ['user', 'assistant'] })
  role: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

@Schema({ timestamps: true, collection: 'chatHistory' })
export class ChatHistory {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: Array, default: [] })
  messages: ChatMessage[];

  @Prop({ default: 'AI Engineering' })
  topic: string;
}

export const ChatHistorySchema = SchemaFactory.createForClass(ChatHistory);
