import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column({default: 0})
  views: number

  @Column({nullable: true})
  tags?: string

  @Column({ nullable: true })
  imageUrl?: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date
}
