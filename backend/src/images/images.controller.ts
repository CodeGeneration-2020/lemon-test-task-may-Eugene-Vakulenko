import { ConfigService } from '@nestjs/config';
import { S3Service } from './../s3/s3.service';
import {
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUUID } from 'src/s3/dto/image-uuid.dto';
import { ResponseType } from './dto/response-type.dto';
import { FileValidatorPipe } from 'src/validators/image-file.validator';

@Controller('images')
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  // we can create an interceptor so bucketName would be
  // added to each responce to reduce boilerplate code
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(new FileValidatorPipe())
    file: Express.Multer.File,
  ): Promise<ResponseType> {
    console.log(file);
    const uuid = this.s3Service.uploadFile(file);
    await this.imagesService.create(uuid);
    return {
      data: {
        url: uuid,
      },
      bucketName: this.configService.get<string>('S3_BUCKET_NAME'),
    };
  }

  @Get()
  async findAll(): Promise<ResponseType> {
    const urls = await this.imagesService.findAll();
    return {
      data: {
        url: urls,
      },
      bucketName: this.configService.get<string>('S3_BUCKET_NAME'),
    };
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOne(@Param('id') id: ImageUUID) {
    // we can implement this if we need to get a thumbnail
    // for example, for carousel, to reduce size of an image
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile(new FileValidatorPipe())
    file: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<ResponseType> {
    const uuid = await this.imagesService.update(id, file);
    return {
      data: {
        url: uuid,
      },
      bucketName: this.configService.get<string>('S3_BUCKET_NAME'),
    };
  }

  @Delete(':id')
  delete(@Param('id') id: ImageUUID): void {
    this.imagesService.delete(id);
    return;
  }
}
