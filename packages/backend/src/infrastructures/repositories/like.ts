import { Post } from "@domains/entities/post";
import { Like } from "@domains/entities/like";
import { LikePostDTO } from "@api/endpoints/like/dtos/like-post";

export class LikeRepository {
  delete: (like_id: Like['id']) => Promise<void>
  create: (payload: LikePostDTO) => Promise<Like>
  getLikes: (post_id: Post['id']) => Promise<Like[]>
  isLiked: (payload: LikePostDTO) => Promise<boolean>
  findById: (like_id: Like['id']) => Promise<Like | undefined>
}
