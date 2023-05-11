import { Controller, Post, Delete, UseGuards, Body } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendshipDto } from './dto/friendship.dto';
import { User } from '../decorators/user.decorator';

@Controller('friendships')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addFriendship(
    @User() userId: number,
    @Body() friendshipDto: FriendshipDto,
  ): Promise<void> {
    await this.friendshipService.addFriendship(userId, friendshipDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  async removeFriendship(
    @User() userId: number,
    @Body() friendshipDto: FriendshipDto,
  ): Promise<void> {
    await this.friendshipService.removeFriendship(userId, friendshipDto);
  }
}
