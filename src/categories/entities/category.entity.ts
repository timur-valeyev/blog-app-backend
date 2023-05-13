import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { PostEntity } from '../../post/entities/post.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  posts: PostEntity[];
}

