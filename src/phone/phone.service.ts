import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { PhoneEntity } from './entity/phone.entity';
import { CheckCodeDto } from './dto/check-code.dto';
import { MoreThan } from 'typeorm';

@Injectable()
export class PhoneService {
  async createPhone(createPhoneDto : CreatePhoneDto):Promise<string> {
    const phoneEntity = new PhoneEntity();
    phoneEntity.phoneNumber = createPhoneDto.phoneNumber;
    //랜덤 숫자 생성, 형변환, 포맷
    phoneEntity.code = String(Math.floor(Math.random() * 10000)).padStart(4,'0');
    phoneEntity.date = new Date();
    await phoneEntity.save();
    return phoneEntity.code;
  }

  async checkCode(checkCodeDto : CheckCodeDto) : Promise<boolean> {
    const phoneEntity  = await PhoneEntity.findOne(
      {where : {phoneNumber : checkCodeDto.phoneNumber, date : MoreThan(new Date(Date.now() - (5 * 60 * 1000)))}
      , order : {id : "DESC"}}
    );
    if (phoneEntity === null ){
      return false;
    }
    return phoneEntity.code === checkCodeDto.code;
  }
}
