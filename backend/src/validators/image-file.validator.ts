import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ParseFilePipe } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
  async transform(value: any) {
    const file = await new ParseFilePipe().transform(value);

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
    const fileExt = extname(file.originalname);
    if (!allowedExtensions.includes(fileExt)) {
      throw new BadRequestException('Invalid file extension');
    }

    if (file.size > 1024 * 1024) {
      throw new BadRequestException('File size must be less than 1MB');
    }

    return file;
  }
}
