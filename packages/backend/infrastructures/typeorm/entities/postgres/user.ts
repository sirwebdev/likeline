import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { LikeEntity } from "./like";
import { PostEntity } from "./post";
import { CommentEntity } from "./comment";
import { User } from "@domains/entities/user";
import { Post } from "@domains/entities/post";
import { Like } from "@domains/entities/like";
import { Comment } from "@domains/entities/comment";

@Entity({ name: 'user' })
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  photo_filename?: string;

  @OneToMany(() => PostEntity, post => post.owner)
  posts: Post[]

  @OneToMany(() => LikeEntity, like => like.user)
  likes: Like[]

  @OneToMany(() => CommentEntity, comment => comment.user)
  comments: Comment[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
