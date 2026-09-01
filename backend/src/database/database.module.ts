import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseSeederService } from './database-seeder.service';
import { Course, CourseSchema } from '../schemas/course.schema';
import { ModuleItem, ModuleSchema } from '../schemas/module.schema';
import { Quiz, QuizSchema } from '../schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: ModuleItem.name, schema: ModuleSchema },
      { name: Quiz.name, schema: QuizSchema },
    ]),
  ],
  providers: [DatabaseSeederService],
  exports: [DatabaseSeederService],
})
export class DatabaseModule {}
