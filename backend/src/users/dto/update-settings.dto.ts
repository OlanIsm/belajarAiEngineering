import { IsOptional, IsIn, IsString } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsIn(['light', 'dark'])
  theme?: string;

  @IsOptional()
  @IsIn(['id', 'en'])
  language?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
