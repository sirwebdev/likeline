import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from "typeorm";

import { User } from "@domains/entities/user";
import { Reply } from "@domains/entities/reply";
import { Comment } from "@domains/entities/comment";

@Entity('reply')
export class ReplyEntity implements Reply {
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  comment: string;

  @Column()
  comment_id: Comment['id'];

  @Column()
  user: Pick<User, "id" | "username" | "photo_filename" | "photo_url">;

  @CreateDateColumn()
  created_at: Date
}
