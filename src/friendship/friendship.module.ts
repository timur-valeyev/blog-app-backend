import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipController } from './friendship.controller';
import { FriendshipEntity } from './entities/friendship.entity';
import { FriendshipService } from './friendship.service';
import { UserEntity } from '../user/entities/user.entity';
import { PostEntity } from '../post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, UserEntity, FriendshipEntity]),
  ],
  controllers: [FriendshipController],
  providers: [FriendshipService],
})
export class FriendshipModule {}
