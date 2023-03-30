import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  generateJwtToken (data: {id: number, email: string}) {
    const payload = {email: data.email, sub: data.id}
    return this.jwtService.sign(payload)
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email, password);
    if (user && user.password === password) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const {password, ...userData} = user
    return {
      ...userData,
      access_token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const {password, ...user} = await this.userService.create({
        fullName: dto.fullName,
        email: dto.email,
        password: dto.password
      })

      return {
        ...user,
        access_token: this.generateJwtToken(user),
      }
    } catch (e) {
      throw new ForbiddenException('Пользователь с таким email уже зарегистрирован')
    }
  }
}
