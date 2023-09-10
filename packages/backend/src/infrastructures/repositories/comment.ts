import { Post } from "@domains/entities/post";
import { Comment } from "@domains/entities/comment"

export class CommentRepository {
  getByPostId: (post_id: Post['id']) => Promise<Comment[]>;
  create: (payload: Omit<Comment, 'id' | 'replies'>) => Promise<Comment>;
  findById: (comment_id: Comment['id']) => Promise<Comment | undefined>
}
