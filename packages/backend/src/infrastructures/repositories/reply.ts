import { Reply } from "@domains/entities/reply";
import { ReplyCommentMethodDTO } from "@api/endpoints/reply/dtos/reply-comment-method";

export class ReplyRepository {
  reply: (payload: ReplyCommentMethodDTO) => Promise<Reply>;
}
