import { Reply } from "@domains/entities/reply";
import { Comment } from "@domains/entities/comment"
import { ReplyCommentMethodDTO } from "@api/endpoints/reply/dtos/reply-comment-method";

export class ReplyRepository {
  reply: (payload: ReplyCommentMethodDTO) => Promise<Reply>;
  getRepliesByCommentId: (comment_id: Comment['id']) => Promise<Reply[]>
}
