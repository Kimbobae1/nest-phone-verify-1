import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PhoneEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  phoneNumber : string;

  @Column()
  code : string;

  @Column()
  date : Date;
}