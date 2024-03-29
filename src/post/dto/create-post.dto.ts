import { IsOptional } from 'class-validator';

export interface OutputBlockData {
  id?: string;
  type: any;
  data: any;
}

export class CreatePostDto {
  title: string;

  body: OutputBlockData[];

  @IsOptional()
  tags: string;

  @IsOptional()
  image?: any;

  @IsOptional()
  category: any;
}
