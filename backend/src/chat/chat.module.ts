import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatHistory, ChatHistorySchema } from '../schemas/chat-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ChatHistory.name, schema: ChatHistorySchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
