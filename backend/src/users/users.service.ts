import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid user ID');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.theme) user.theme = dto.theme;
    if (dto.language) user.language = dto.language;
    if (dto.name) user.name = dto.name;

    await user.save();

    return {
      message: 'Settings updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        theme: user.theme,
        language: user.language,
      },
    };
  }
}
