import { PartialType } from '@nestjs/mapped-types'
import { CreatePostDto } from './create-post.dto'
import { IsOptional } from 'class-validator'

export class UpdatePostDto extends PartialType(CreatePostDto) {
  title: string

  body: any

  @IsOptional()
  tags: string

  @IsOptional()
  image?: any

  category: any
}
