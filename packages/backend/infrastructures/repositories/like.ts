import { Like } from "@domains/entities/like";
import { LikePostDTO } from "@api/endpoints/like/dtos/like-post";

export class LikeRepository {
  create: (payload: LikePostDTO) => Promise<Like>
  isLiked: (payload: LikePostDTO) => Promise<boolean>
}
