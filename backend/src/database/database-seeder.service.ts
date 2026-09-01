import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { Course, CourseDocument } from '../schemas/course.schema';
import { ModuleItem, ModuleDocument } from '../schemas/module.schema';
import { Quiz, QuizDocument } from '../schemas/quiz.schema';

@Injectable()
export class DatabaseSeederService implements OnApplicationBootstrap {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(ModuleItem.name) private moduleModel: Model<ModuleDocument>,
    @InjectModel(Quiz.name) private quizModel: Model<QuizDocument>,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.seedAllData();
    } catch (err) {
      console.error('⚠️ [DatabaseSeeder] Auto-seeding warning:', err);
    }
  }

  async seedAllData() {
    const seedDir = path.resolve(__dirname, '../../../seed');

    // 1. Seed Courses & Modules
    const coursesPath = path.join(seedDir, 'courses.json');
    if (fs.existsSync(coursesPath)) {
      const rawCourses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));

      for (const item of rawCourses) {
        const { slug, ...courseData } = item;

        let course = await this.courseModel.findOne({ title: courseData.title });
        if (!course) {
          course = await this.courseModel.create(courseData);
          console.log(`✅ [Auto-Seed] Created Course: ${course.title}`);
        }

        const moduleFilePath = path.join(seedDir, 'modules', `${slug}.json`);
        if (fs.existsSync(moduleFilePath)) {
          const rawModules = JSON.parse(fs.readFileSync(moduleFilePath, 'utf8'));

          for (const mod of rawModules) {
            const existingMod = await this.moduleModel.findOne({
              courseId: course._id,
              title: mod.title,
            });

            if (!existingMod) {
              await this.moduleModel.create({
                ...mod,
                courseId: course._id,
              });
              console.log(`   └─ ✅ [Auto-Seed] Added Module: ${mod.title}`);
            }
          }
        }
      }
    }

    // 2. Seed Quizzes
    const quizPath = path.join(seedDir, 'quizzes', 'week-01.json');
    if (fs.existsSync(quizPath)) {
      const quizData = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
      const existingQuiz = await this.quizModel.findOne({
        weekNumber: quizData.weekNumber,
        year: quizData.year,
      });

      if (!existingQuiz) {
        await this.quizModel.create(quizData);
        console.log(`✅ [Auto-Seed] Created Quiz for Week ${quizData.weekNumber} (${quizData.year})`);
      }
    }
  }
}
