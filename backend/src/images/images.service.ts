import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../entities/image.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ImageUUID } from 'src/s3/dto/image-uuid.dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private configService: ConfigService,
    private s3Service: S3Service,
  ) {}

  async create(s3_uuid: ImageUUID): Promise<ImageUUID> {
    try {
      const image = await this.imagesRepository.save({
        bucket_name: this.configService.get<string>('S3_BUCKET_NAME'),
        s3_uuid,
      });
      return image.s3_uuid;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async findAll(): Promise<ImageUUID[]> {
    try {
      const images = await this.imagesRepository.find();
      return images.map((image) => image.s3_uuid);
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async findOne(id: ImageUUID): Promise<ImageUUID> {
    try {
      const image = await this.imagesRepository.findOneBy({ s3_uuid: id });
      return image.s3_uuid;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async update(id: ImageUUID, file: Express.Multer.File): Promise<ImageUUID> {
    const s3_uuid = this.s3Service.updateFile(id, file);
    try {
      await this.imagesRepository.update({ s3_uuid }, { s3_uuid });
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong!');
    }
    return id;
  }

  async delete(id: ImageUUID): Promise<DeleteResult> {
    try {
      return await this.imagesRepository.delete({ s3_uuid: id });
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
