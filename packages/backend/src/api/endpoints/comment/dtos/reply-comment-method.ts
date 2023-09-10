import { Comment } from "@domains/entities/comment"

export class ReplyCommentMethodDTO {
  user: Comment['user'];
  comment: Comment['comment'];
  comment_id: Comment['id']
}
