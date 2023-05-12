import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { appConfig } from 'src/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Image]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, S3Service],
})
export class ImagesModule {}
