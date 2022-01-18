import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateStreamerDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1].indexOf(value) > -1;
  })
  status: boolean;
}
