import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatHistory, ChatHistoryDocument } from '../schemas/chat-history.schema';

@Injectable()
export class ChatService {
  private genAI: GoogleGenerativeAI | null = null;
  // In-memory sliding window rate limiter: userId -> timestamp array
  private rateLimits: Map<string, number[]> = new Map();

  constructor(
    @InjectModel(ChatHistory.name) private chatModel: Model<ChatHistoryDocument>,
    private configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  private checkRateLimit(userId: string): void {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 10; // 10 req/min limit per user

    const timestamps = this.rateLimits.get(userId) || [];
    // Filter timestamps within the 1-minute window
    const validTimestamps = timestamps.filter((ts) => now - ts < windowMs);

    if (validTimestamps.length >= maxRequests) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Requests',
          message: 'Rate limit exceeded: Maximum 10 requests per minute allowed.',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    validTimestamps.push(now);
    this.rateLimits.set(userId, validTimestamps);
  }

  async processChatMessage(userId: string, prompt: string) {
    this.checkRateLimit(userId);

    const systemPrompt = `You are a helpful, encouraging AI Engineering tutor for BelajarAIEngineering.com.
Your mascot is a friendly Fire Character 🔥.
Strict Guardrail Rules:
1. Stay on-topic: Only answer queries related to AI Engineering, Machine Learning, Deep Learning, Python, Prompt Engineering, and computer science concepts.
2. If the user asks about unrelated topics (e.g., sports, cooking, politics, pop music), politely refuse and redirect: "I am your AI Engineering tutor! Let's keep our focus on learning AI & software engineering topics 🔥"
3. Provide concise, clear, and actionable responses with code examples when helpful.`;

    let replyText = '';

    if (this.genAI) {
      try {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(`${systemPrompt}\n\nUser Question: ${prompt}`);
        replyText = result.response.text();
      } catch (err) {
        console.error('Gemini API Error:', err);
        replyText = `[AI Tutor] Thanks for asking! I encountered a temporary connection issue. Make sure to check Python syntax or ML feature scaling best practices in our Study section! 🔥`;
      }
    } else {
      // Mock fallback response for offline/development mode when GEMINI_API_KEY is not set
      replyText = `🔥 [AI Tutor Mock]: Great question about "${prompt}"! In AI Engineering, structuring clear system prompts and tuning parameters like temperature (e.g. 0.7) ensures high-quality model outputs.`;
    }

    // Save message pair to MongoDB chatHistory
    if (Types.ObjectId.isValid(userId)) {
      const uId = new Types.ObjectId(userId);
      let history = await this.chatModel.findOne({ userId: uId });

      if (!history) {
        history = await this.chatModel.create({
          userId: uId,
          messages: [],
          topic: 'AI Engineering',
        });
      }

      history.messages.push({ role: 'user', content: prompt, timestamp: new Date() });
      history.messages.push({ role: 'assistant', content: replyText, timestamp: new Date() });
      await history.save();
    }

    return {
      reply: replyText,
      timestamp: new Date(),
    };
  }

  async getChatHistory(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      return { messages: [] };
    }
    const history = await this.chatModel.findOne({ userId: new Types.ObjectId(userId) }).lean();
    return history || { messages: [] };
  }
}
