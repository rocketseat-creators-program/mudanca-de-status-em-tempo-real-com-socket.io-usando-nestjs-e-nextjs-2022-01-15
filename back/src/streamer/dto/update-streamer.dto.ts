import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateStreamerDto } from './create-streamer.dto';

export class UpdateStreamerDto extends PartialType(CreateStreamerDto) {
  @IsString()
  @IsOptional()
  key?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1].indexOf(value) > -1;
  })
  status?: boolean;
}
