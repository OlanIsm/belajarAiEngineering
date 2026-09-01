import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from '../schemas/course.schema';
import { ModuleItem, ModuleDocument } from '../schemas/module.schema';
import { UserProgress, UserProgressDocument } from '../schemas/user-progress.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(ModuleItem.name) private moduleModel: Model<ModuleDocument>,
    @InjectModel(UserProgress.name) private progressModel: Model<UserProgressDocument>,
  ) {}

  async findAll(userId?: string) {
    const courses = await this.courseModel.find().sort({ order: 1 }).lean();

    const courseList = await Promise.all(
      courses.map(async (c) => {
        const totalModules = await this.moduleModel.countDocuments({ courseId: c._id });

        let completedModules = 0;
        if (userId && Types.ObjectId.isValid(userId)) {
          completedModules = await this.progressModel.countDocuments({
            userId: new Types.ObjectId(userId),
            courseId: c._id,
            completed: true,
          });
        }

        const percentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

        return {
          ...c,
          id: c._id,
          totalModules,
          completedModules,
          progressPercentage: percentage,
        };
      }),
    );

    return courseList;
  }

  async findOne(courseId: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new NotFoundException('Invalid course ID');
    }
    const course = await this.courseModel.findById(courseId).lean();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async findModulesByCourse(courseId: string, userId?: string) {
    if (!Types.ObjectId.isValid(courseId)) {
      throw new NotFoundException('Invalid course ID');
    }

    const modules = await this.moduleModel.find({ courseId: new Types.ObjectId(courseId) }).sort({ order: 1 }).lean();

    const moduleList = await Promise.all(
      modules.map(async (m) => {
        let completed = false;
        if (userId && Types.ObjectId.isValid(userId)) {
          const prog = await this.progressModel.findOne({
            userId: new Types.ObjectId(userId),
            moduleId: m._id,
          });
          if (prog) {
            completed = prog.completed;
          }
        }
        return {
          ...m,
          id: m._id,
          completed,
        };
      }),
    );

    return moduleList;
  }

  async findModuleDetails(moduleId: string, userId?: string) {
    if (!Types.ObjectId.isValid(moduleId)) {
      throw new NotFoundException('Invalid module ID');
    }

    const mod = await this.moduleModel.findById(moduleId).lean();
    if (!mod) {
      throw new NotFoundException('Module not found');
    }

    let completed = false;
    if (userId && Types.ObjectId.isValid(userId)) {
      const prog = await this.progressModel.findOne({
        userId: new Types.ObjectId(userId),
        moduleId: new Types.ObjectId(moduleId),
      });
      if (prog) {
        completed = prog.completed;
      }
    }

    return {
      ...mod,
      id: mod._id,
      completed,
    };
  }

  async markModuleComplete(userId: string, moduleId: string) {
    if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(moduleId)) {
      throw new NotFoundException('Invalid user or module ID');
    }

    const mod = await this.moduleModel.findById(moduleId);
    if (!mod) {
      throw new NotFoundException('Module not found');
    }

    const uId = new Types.ObjectId(userId);
    const mId = new Types.ObjectId(moduleId);

    let prog = await this.progressModel.findOne({ userId: uId, moduleId: mId });

    if (!prog) {
      prog = await this.progressModel.create({
        userId: uId,
        courseId: mod.courseId,
        moduleId: mId,
        completed: true,
        completedAt: new Date(),
        progress: 100,
      });
    } else {
      prog.completed = true;
      prog.completedAt = new Date();
      prog.progress = 100;
      await prog.save();
    }

    // Calculate total course completion percentage
    const totalModules = await this.moduleModel.countDocuments({ courseId: mod.courseId });
    const completedModules = await this.progressModel.countDocuments({
      userId: uId,
      courseId: mod.courseId,
      completed: true,
    });
    const courseProgressPercent = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    return {
      message: 'Module marked as completed',
      completed: true,
      courseProgressPercent,
    };
  }
}
