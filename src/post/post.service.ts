import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { SearchPostDto } from './dto/searchg-post.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    })
  }

  async popular() {
    const posts = await this.prisma.post.findMany({
      orderBy: {
        views: 'desc',
      },
      take: 10,
    })

    return {
      items: posts,
      total: posts.length,
    }
  }

  async search(dto: SearchPostDto) {
    const where: any = {}

    if (dto.title) {
      where.title = {
        contains: dto.title,
        mode: 'insensitive',
      }
    }

    if (dto.body) {
      where.body = {
        array_contains: dto.body,
      }
    }

    if (dto.tag) {
      where.tags = {
        contains: dto.tag,
        mode: 'insensitive',
      }
    }

    const posts = await this.prisma.post.findMany({
      where,
      orderBy: dto.views ? { views: dto.views } : { createdAt: 'desc' },
      skip: dto.limit || 0,
      take: dto.take || 10,
      include: {
        user: true,
      },
    })

    const total = await this.prisma.post.count({ where })

    return { items: posts, total }
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    if (!post) {
      throw new NotFoundException('Статья не найдена')
    }

    // Инкремент views
    await this.prisma.post.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    return post
  }

  async create(dto: CreatePostDto, userId: number) {
    return this.prisma.post.create({
      data: {
        title: dto.title,
        body: dto.body,
        tags: dto.tags,
        image: dto.image,
        category: dto.category,
        user: {
          connect: { id: userId },
        },
      },
      include: {
        user: true,
      },
    })
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      throw new NotFoundException('Статья не найдена')
    }

    if (post.userId !== userId) {
      throw new ForbiddenException('Нет доступа к этой статье!')
    }

    return this.prisma.post.update({
      where: { id },
      data: {
        ...dto,
      },
    })
  }

  async remove(id: number, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      throw new NotFoundException('Статья не найдена')
    }

    if (post.userId !== userId) {
      throw new ForbiddenException('Нет доступа к этой статье!')
    }

    return this.prisma.post.delete({
      where: { id },
    })
  }
}
