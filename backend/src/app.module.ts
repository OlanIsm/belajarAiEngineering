import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { QuizModule } from './quiz/quiz.module';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

let mongoMemoryServer: MongoMemoryServer | null = null;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const envUri = configService.get<string>('MONGODB_URI') || 'mongodb://127.0.0.1:27017/belajar_ai_engineering';
        
        // Attempt quick check or fallback to MongoMemoryServer
        try {
          // If connecting to local host and daemon might be missing, test or spin up in-memory server
          if (envUri.includes('localhost') || envUri.includes('127.0.0.1')) {
            console.log('⚡ Initializing database connection...');
            mongoMemoryServer = await MongoMemoryServer.create({
              instance: { dbName: 'belajar_ai_engineering' },
            });
            const memoryUri = mongoMemoryServer.getUri();
            console.log(`🔥 Connected to automatic In-Memory MongoDB: ${memoryUri}`);
            return { uri: memoryUri };
          }
          return { uri: envUri };
        } catch (e) {
          console.warn('⚠️ Primary Mongo connection failed. Spawning MongoMemoryServer fallback...');
          mongoMemoryServer = await MongoMemoryServer.create();
          const uri = mongoMemoryServer.getUri();
          console.log(`🔥 Fallback In-Memory MongoDB connected at ${uri}`);
          return { uri };
        }
      },
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    CoursesModule,
    QuizModule,
    ChatModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
