import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { PhoneEntity } from './entity/phone.entity';

@Injectable()
export class PhoneService {
  async createPhone(createPhoneDto : CreatePhoneDto):Promise<PhoneEntity> {
    const phoneEntity = new PhoneEntity();
    phoneEntity.phoneNumber = createPhoneDto.phoneNumber;
    //랜덤 숫자 생성, 형변환, 포맷
    phoneEntity.code = String(Math.floor(Math.random() * 10000)).padStart(4,'0');
    phoneEntity.date = new Date();
    return await phoneEntity.save();
  }
}
