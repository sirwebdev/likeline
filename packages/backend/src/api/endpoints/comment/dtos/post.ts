import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { Comment } from "@domains/entities/comment";

export class CommentPostDTO {
  user_id: User['id'];
  post_id: Post['id'];
  comment: Comment['comment'];
}
