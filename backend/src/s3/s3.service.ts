import { Injectable, UploadedFile } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ImageUUID } from './dto/image-uuid.dto';

@Injectable()
export class S3Service {
  uploadFile(@UploadedFile() file: Express.Multer.File): ImageUUID {
    // upload file in the bucket and get uuid
    file.buffer = null;
    return randomUUID();
  }

  updateFile(id: string, @UploadedFile() file: Express.Multer.File): ImageUUID {
    // delete existing file by uuid from bucket
    // upload new file with the same uuid in the bucket
    file.buffer = null;
    return id;
  }
}
