import { Post } from "@domains/entities/post";
import { CreatePostDTO } from "@infrastructures/dtos/create-post";

export class PostRepository {
  create: (payload: CreatePostDTO) => Promise<Post>
}
