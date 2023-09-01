import { Comment } from "@domains/entities/comment"
import { CommentPostDTO } from "@api/endpoints/comment/dtos/post"

export class CommentRepository {
  create: (payload: CommentPostDTO) => Promise<Comment>;
}
