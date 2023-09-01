import { Column, Entity, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm"

import { Post } from "@domains/entities/post"
import { User } from "@domains/entities/user"
import { Comment } from "@domains/entities/comment"

@Entity({ name: 'comment' })
export class MongoCommentEntity implements Comment {
  @ObjectIdColumn()
  comment_id: ObjectId

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  comment: string

  @Column()
  post_id: string

  @Column()
  user_id: string

  post: Post

  user: User
}
