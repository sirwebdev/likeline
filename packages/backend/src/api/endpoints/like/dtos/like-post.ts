import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";

export class LikePostDTO {
  user_id: User['id']
  post_id: Post['id']
}
