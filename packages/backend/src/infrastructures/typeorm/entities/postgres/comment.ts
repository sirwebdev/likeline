import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

import { Post } from "@domains/entities/post"
import { User } from "@domains/entities/user"
import { Comment } from "@domains/entities/comment"
import { PostEntity } from "./post"
import { UserEntity } from "./user"

@Entity({ name: 'comment' })
export class CommentEntity implements Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  comment: string

  @Column()
  post_id: string

  @Column()
  user_id: string

  @ManyToOne(() => PostEntity, post => post.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post: Post

  @ManyToOne(() => UserEntity, user => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User
}
