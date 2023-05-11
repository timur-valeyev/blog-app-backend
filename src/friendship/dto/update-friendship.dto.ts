import { PartialType } from '@nestjs/mapped-types';
import { FriendshipDto } from './friendship.dto';

export class UpdateFriendshipDto extends PartialType(FriendshipDto) {}
