import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { CreatePostDTO } from "@infrastructures/dtos/create-post";

export class PostRepository {
  create: (payload: CreatePostDTO) => Promise<Post>
  updatePhotoFromAllPostFromUserID: (userID: User['id'], filename: string) => Promise<void>
}
