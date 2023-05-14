import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto, OutputBlockData } from './create-post.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  title: string;

  body: OutputBlockData[];

  @IsOptional()
  tags: string;

  @IsOptional()
  image?: any;

  category: any;
}
