import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendshipEntity } from './entities/friendship.entity';
import { FriendshipDto } from './dto/friendship.dto';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(FriendshipEntity)
    private readonly friendshipRepository: Repository<FriendshipEntity>,
  ) {}

  async addFriendship(
    userId: number,
    friendshipDto: FriendshipDto,
  ): Promise<FriendshipEntity> {
    const friendship: FriendshipEntity = new FriendshipEntity();

    friendship.user = userId;
    friendship.friend = friendshipDto.friendId;

    return await this.friendshipRepository.save(friendship);
  }
  async removeFriendship(
    userId: number,
    friendshipDto: FriendshipDto,
  ): Promise<void> {
    const friendship: FriendshipEntity =
      await this.friendshipRepository.findOne({
        where: { user: userId, friend: friendshipDto.friendId },
      });

    if (friendship) {
      await this.friendshipRepository.delete(friendship.id);
    } else {
      throw new Error('This user is not your friend.');
    }
  }
}
