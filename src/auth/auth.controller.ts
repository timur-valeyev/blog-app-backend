import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async create(@Body() dto: CreateUserDto, @UploadedFile() file) {
    const avatar = file ? file.originalname : null;
    const userDto = {
      avatar,
      ...dto,
    };
    return this.authService.register(userDto);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../frontend/public/upload/avatar',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return file.filename;
  }
}
