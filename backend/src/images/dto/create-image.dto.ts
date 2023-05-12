import { IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  s3_uuid: string;
}
