import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { Comment } from "@domains/entities/comment"

export class CommentRepository {
  getByPostId: (post_id: Post['id']) => Promise<Comment[]>;
  deleteAllByUserId: (user_id: User['id']) => Promise<void>;
  deleteAllByPostId: (post_id: Post['id']) => Promise<void>;
  findById: (comment_id: Comment['id']) => Promise<Comment | undefined>;
  create: (payload: Omit<Comment, 'id' | 'replies'>) => Promise<Comment>;
  updatePhotoFromAllCommentsByUserID: (user_id: User['id'], filename: User['photo_filename']) => Promise<void>
}
