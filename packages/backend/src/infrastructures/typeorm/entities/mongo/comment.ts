import { Column, Entity, ObjectIdColumn } from "typeorm"

import { Post } from "@domains/entities/post"
import { User } from "@domains/entities/user"
import { Comment } from "@domains/entities/comment"

@Entity('comment')
export class CommentEntity implements Comment {
  @ObjectIdColumn()
  id: string

  @Column()
  comment: string

  @Column()
  post: Post

  @Column()
  user: User
}
