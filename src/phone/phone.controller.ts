import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { SendCodeDto } from './dto/send-code.dto';
import { PhoneService } from './phone.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckCodeDto } from './dto/check-code.dto';
import { SendResultDto } from './dto/send-result.dto';

@ApiTags('phone')
@Controller('phones')
export class PhoneController {

  constructor(private phoneService : PhoneService) {
  }

  @Post('/create-code')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'create new phone'})
  @ApiResponse({status: 201, type: SendCodeDto})
  async createPhone(@Body() createPhoneDto : CreatePhoneDto) : Promise<SendCodeDto> {
    const sendCodeDto = new SendCodeDto();
    sendCodeDto.code =  await this.phoneService.createPhone(createPhoneDto);
    return sendCodeDto;
  }

  @Post('/check-code')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'check code'})
  @ApiResponse({status: 200, type: SendResultDto})
  async checkCode(@Body() checkCodeDto : CheckCodeDto) : Promise<SendResultDto> {
    const sendResultDto = new SendResultDto();
    sendResultDto.result = await this.phoneService.checkCode(checkCodeDto);

    return sendResultDto;
  }

}
