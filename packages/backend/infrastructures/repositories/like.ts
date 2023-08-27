import { Like } from "@domains/entities/like";
import { LikePostDTO } from "@api/endpoints/like/dtos/like-post";
import { Post } from "@domains/entities/post";

export class LikeRepository {
  create: (payload: LikePostDTO) => Promise<Like>
  getLikes: (post_id: Post['id']) => Promise<Like[]>
  isLiked: (payload: LikePostDTO) => Promise<boolean>
}
