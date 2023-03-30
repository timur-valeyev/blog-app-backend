import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsString} from "class-validator";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsString()
  fullName: string

  @Column({unique: true})
  email: string

  @Column({nullable: true})
  @IsString()
  password?: string
}
