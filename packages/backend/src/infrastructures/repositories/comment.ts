import { Post } from "@domains/entities/post";
import { Comment } from "@domains/entities/comment"
import { ReplyCommentMethodDTO } from "@api/endpoints/comment/dtos/reply-comment-method";

export class CommentRepository {
  getByPostId: (post_id: Post['id']) => Promise<Comment[]>;
  reply: (payload: ReplyCommentMethodDTO) => Promise<Comment>;
  create: (payload: Omit<Comment, 'id' | 'replies'>) => Promise<Comment>;
  findById: (comment_id: Comment['id']) => Promise<Comment | undefined>
}
