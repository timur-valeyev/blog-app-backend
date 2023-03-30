import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {SearchUserDto} from "./dto/search-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(email: string, password: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({where: {email, password}});
  }

  findById (id: number) {
    return this.repository.findOne({where: {id}})
  }

  update(id: number, dto: UpdateUserDto) {
    return this.repository.update(id, dto)
  }
  async search(dto: SearchUserDto) {
    const qb = this.repository.createQueryBuilder('u')

    qb.setParameters({
      fullName: `%${dto.fullName}%`,
      email: `%${dto.email}%`
    })

    qb.limit(dto.limit || 0)
    qb.take(dto.take || 10)

    if(dto.fullName) {
      qb.andWhere(`u.fullName ILIKE :fullName`)
    }

    if(dto.email) {
      qb.andWhere(`u.email ILIKE :email`)
    }


    const [items, total] = await qb.getManyAndCount()

    return {items, total}
  }
}
