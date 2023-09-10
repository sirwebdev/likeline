import { User } from "@domains/entities/user";
import { Comment } from "@domains/entities/comment";

export class ReplyCommentDTO {
  user_id: User['id'];
  comment_id: Comment['id'];
  comment: Comment['comment'];
}
