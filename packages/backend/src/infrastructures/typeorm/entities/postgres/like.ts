import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { UserEntity } from "./user";
import { PostEntity } from "./post";
import { Like } from "@domains/entities/like";
import { User } from "@domains/entities/user";
import { Post } from "@domains/entities/post";

@Entity({ name: 'like' })
export class LikeEntity implements Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  post_id: string

  @ManyToOne(() => UserEntity, user => user.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToOne(() => PostEntity, post => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
