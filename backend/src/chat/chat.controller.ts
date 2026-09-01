import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async sendMessage(@Request() req: any, @Body() body: { prompt: string }) {
    const userId = req.user._id.toString();
    return this.chatService.processChatMessage(userId, body.prompt);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@Request() req: any) {
    const userId = req.user._id.toString();
    return this.chatService.getChatHistory(userId);
  }
}
