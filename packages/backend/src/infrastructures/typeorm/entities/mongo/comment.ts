import { Column, Entity, ObjectIdColumn } from "typeorm"

import { User } from "@domains/entities/user"
import { Comment } from "@domains/entities/comment"
import { Reply } from "@domains/entities/reply"

@Entity('comment')
export class CommentEntity implements Comment {
  @ObjectIdColumn()
  id: string

  @Column()
  comment: string

  @Column()
  post_id: string

  @Column()
  user: User

  @Column({ default: [] })
  replies: Reply[]
}
