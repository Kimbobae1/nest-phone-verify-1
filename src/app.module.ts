import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { addTransactionalDataSource, getDataSourceByName } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { PhoneModule } from './phone/phone.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          //DB 설정을 .env에서 가져오려면?
          type: 'postgres',
          host:  process.env.DB_HOST,
          port:  parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password:  process.env.DB_PASSWORD,
          database:  process.env.DB_DATABASE,
          synchronize: true,
          timezone: 'Z',
          //DB 설정할때 entity 경로 지정
          entities: [__dirname + '/**/*.entity{.ts,.js}']
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return getDataSourceByName('default') || addTransactionalDataSource(new DataSource(options));
      },
    }),
    PhoneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
