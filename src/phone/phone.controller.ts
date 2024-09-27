import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { SendCodeDto } from './dto/send-code.dto';
import { PhoneService } from './phone.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('phone')
@Controller('phone')
export class PhoneController {

  constructor(private phoneService : PhoneService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'create new phone'})
  @ApiResponse({status: 201, type: SendCodeDto})
  async createPhone(@Body() createPhoneDto : CreatePhoneDto) : Promise<SendCodeDto> {
    const phoneEntity = await this.phoneService.createPhone(createPhoneDto);
    const sendCodeDto = new SendCodeDto();
    sendCodeDto.code = phoneEntity.code;
    return sendCodeDto;
  }

}
