import {IsEmail, IsOptional, Length} from 'class-validator';
import { UniqueOnDatabase } from '../../auth/validations/UniqueValidation';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3)
  fullName: string;

  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(UserEntity, {
    message: 'Пользователь с такой почтой уже зарегистрирован',
  })
  email: string;

  @Length(6, 32, { message: 'Пароль должен минимум 6 символов' })
  password?: string;

  @IsOptional()
  avatar: any;
}
