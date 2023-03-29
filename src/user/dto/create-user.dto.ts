import {IsEmail, Length} from "class-validator";

export class CreateUserDto {
  @Length(2)
  fullName: string

  @IsEmail(undefined, {message: 'Неверный формат почты!'})
  email: string

  @Length(6, 32, {message: 'Пароль должен быть не менее 6 символов'})
  password?: string
}
