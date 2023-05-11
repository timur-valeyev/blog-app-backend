import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FriendshipEntity } from '../friendship/entities/friendship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FriendshipEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
