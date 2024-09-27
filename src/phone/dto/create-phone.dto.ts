import { ApiProperty } from '@nestjs/swagger';

export class CreatePhoneDto {
  @ApiProperty()
  phoneNumber : string;
}