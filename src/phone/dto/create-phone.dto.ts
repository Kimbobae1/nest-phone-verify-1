import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreatePhoneDto {
  @IsNotEmpty()
  @IsString()
	@Matches(/^010-\d{4}-\d{4}$/, {message: 'Phone number must be in the format 010-xxxx-xxxx'})
  @ApiProperty()
  phoneNumber : string;
}