import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhoneDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phoneNumber : string;
}