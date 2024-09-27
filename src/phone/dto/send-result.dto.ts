import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SendResultDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  result : boolean;
}