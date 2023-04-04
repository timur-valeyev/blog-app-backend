import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user/entities/user.entity";
import { PostModule } from './post/post.module';
import {PostEntity} from "./post/entities/post.entity";
import { CommentModule } from './comment/comment.module';
import {CommentEntity} from "./comment/entities/comment.entity";
import { AuthModule } from "./auth/auth.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blog_db',
      entities: [UserEntity, PostEntity, CommentEntity],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
