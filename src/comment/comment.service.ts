import { Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCommentDto, userId: number) {
    return await this.prisma.comment.create({
      data: {
        text: dto.text,
        post: { connect: { id: dto.postId } },
        user: { connect: { id: userId } },
      },
      include: {
        user: true,
      },
    })
  }

  async findAll(postId?: number) {
    const comments = await this.prisma.comment.findMany({
      where: postId ? { postId } : {},
      include: {
        post: true,
        user: true,
      },
    })

    return comments.map((obj) => ({
      ...obj,
      post: {
        id: obj.post.id,
        title: obj.post.title,
      },
    }))
  }

  async findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
    })
  }

  async update(id: number, dto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: dto,
    })
  }

  async remove(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    })
  }
}
