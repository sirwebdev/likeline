import { Like } from "@domains/entities/like";
import { User } from "@domains/entities/user";

export class UnLikePostDTO {
  user_id: User['id'];
  like_id: Like['id'];
}
