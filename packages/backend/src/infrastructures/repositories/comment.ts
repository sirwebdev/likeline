import { Post } from "@domains/entities/post";
import { Comment } from "@domains/entities/comment"

export class CommentRepository {
  create: (payload: Omit<Comment, 'id' | 'replies'>) => Promise<Comment>;
  getByPostId: (post_id: Post['id']) => Promise<Comment[]>;
}
