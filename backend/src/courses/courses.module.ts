import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from '../schemas/course.schema';
import { ModuleItem, ModuleSchema } from '../schemas/module.schema';
import { UserProgress, UserProgressSchema } from '../schemas/user-progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: ModuleItem.name, schema: ModuleSchema },
      { name: UserProgress.name, schema: UserProgressSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
