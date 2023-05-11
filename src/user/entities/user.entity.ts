import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CommentEntity } from '../../comment/entities/comment.entity';
import { FriendshipEntity } from '../../friendship/entities/friendship.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  @OneToMany(() => CommentEntity, (comment) => comment.user, {
    eager: false,
    nullable: true,
  })
  comments: CommentEntity[];

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.user)
  friendships: FriendshipEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
