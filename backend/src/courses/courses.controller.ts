import { Controller, Get, Put, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('courses')
  async getAllCourses(@Query('userId') userId?: string) {
    return this.coursesService.findAll(userId);
  }

  @Get('courses/:courseId')
  async getCourseDetails(@Param('courseId') courseId: string) {
    return this.coursesService.findOne(courseId);
  }

  @Get('courses/:courseId/modules')
  async getCourseModules(@Param('courseId') courseId: string, @Query('userId') userId?: string) {
    return this.coursesService.findModulesByCourse(courseId, userId);
  }

  @Get('modules/:moduleId')
  async getModuleContent(@Param('moduleId') moduleId: string, @Query('userId') userId?: string) {
    return this.coursesService.findModuleDetails(moduleId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('progress/:userId/:moduleId')
  async markComplete(@Param('userId') userId: string, @Param('moduleId') moduleId: string) {
    return this.coursesService.markModuleComplete(userId, moduleId);
  }
}
