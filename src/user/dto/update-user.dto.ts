import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, Length } from 'class-validator';
import { UniqueOnDatabase } from '../../auth/validations/UniqueValidation';
import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Length(3)
  fullName?: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(UserEntity, {
    message: 'Пользователь с такой почтой уже зарегистрирован',
  })
  email?: string;

  @Length(6, 32, { message: 'Пароль должен минимум 6 символов' })
  password?: string;

  @IsOptional()
  avatar?: any;
}
