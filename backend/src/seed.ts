import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { Course, CourseDocument } from './schemas/course.schema';
import { ModuleItem, ModuleDocument } from './schemas/module.schema';
import { Quiz, QuizDocument } from './schemas/quiz.schema';

async function bootstrapSeed() {
  console.log('🌱 Starting BelajarAIEngineering Database Seeding...');

  const app = await NestFactory.createApplicationContext(AppModule);

  const courseModel = app.get<Model<CourseDocument>>(getModelToken(Course.name));
  const moduleModel = app.get<Model<ModuleDocument>>(getModelToken(ModuleItem.name));
  const quizModel = app.get<Model<QuizDocument>>(getModelToken(Quiz.name));

  const seedDir = path.resolve(__dirname, '../../seed');

  // 1. Seed Courses & Modules
  const coursesPath = path.join(seedDir, 'courses.json');
  if (fs.existsSync(coursesPath)) {
    const rawCourses = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));

    for (const item of rawCourses) {
      const { slug, ...courseData } = item;
      
      let course = await courseModel.findOne({ title: courseData.title });
      if (!course) {
        course = await courseModel.create(courseData);
        console.log(`✅ Created Course: ${course.title}`);
      } else {
        console.log(`ℹ️ Course already exists: ${course.title}`);
      }

      // Check corresponding module seed file
      const moduleFilePath = path.join(seedDir, 'modules', `${slug}.json`);
      if (fs.existsSync(moduleFilePath)) {
        const rawModules = JSON.parse(fs.readFileSync(moduleFilePath, 'utf8'));

        for (const mod of rawModules) {
          const existingMod = await moduleModel.findOne({
            courseId: course._id,
            title: mod.title,
          });

          if (!existingMod) {
            await moduleModel.create({
              ...mod,
              courseId: course._id,
            });
            console.log(`   └─ ✅ Added Module: ${mod.title}`);
          }
        }
      }
    }
  }

  // 2. Seed Quizzes
  const quizPath = path.join(seedDir, 'quizzes', 'week-01.json');
  if (fs.existsSync(quizPath)) {
    const quizData = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
    const existingQuiz = await quizModel.findOne({
      weekNumber: quizData.weekNumber,
      year: quizData.year,
    });

    if (!existingQuiz) {
      await quizModel.create(quizData);
      console.log(`✅ Created Quiz for Week ${quizData.weekNumber} (${quizData.year})`);
    } else {
      console.log(`ℹ️ Quiz for Week ${quizData.weekNumber} already exists`);
    }
  }

  console.log('🎉 Seeding Complete!');
  await app.close();
}

bootstrapSeed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
