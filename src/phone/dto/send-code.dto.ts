import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendCodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  code : string;
}