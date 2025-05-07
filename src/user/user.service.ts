import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { SearchUserDto } from './dto/searchg-user.dto'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        fullName: dto.fullName,
        avatar: dto.avatar,
      },
    })
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        _count: {
          select: { comments: true },
        },
      },
    })

    return users.map((user) => ({
      ...user,
      commentsCount: user._count.comments,
    }))
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findByCond(cond: LoginUserDto) {
    return this.prisma.user.findFirst({
      where: {
        email: cond.email,
        password: cond.password,
      },
    })
  }

  async update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...dto,
      },
    })
  }

  async search(dto: SearchUserDto) {
    const where: any = {}

    if (dto.fullName) {
      where.fullName = {
        contains: dto.fullName,
        mode: 'insensitive',
      }
    }

    if (dto.email) {
      where.email = {
        contains: dto.email,
        mode: 'insensitive',
      }
    }

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: dto.limit || 0,
        take: dto.take || 10,
      }),
      this.prisma.user.count({ where }),
    ])

    return { items, total }
  }
}
