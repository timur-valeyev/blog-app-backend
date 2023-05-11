import { IsInt } from 'class-validator';

export class FriendshipDto {
  @IsInt()
  friendId: number;
}
