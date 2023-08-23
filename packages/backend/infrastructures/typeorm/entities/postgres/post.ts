import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { UserEntity } from "./user";
import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { Like } from "@domains/entities/like";
import { LikeEntity } from "./like";

@Entity({ name: 'post' })
export class PostEntity implements Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  image: string;

  @Column()
  title: string

  @Column()
  owner_id: string;

  @ManyToOne(() => UserEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @ManyToOne(() => LikeEntity, like => like.post_id)
  likes: Like[];

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
