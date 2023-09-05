import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { CreatePostDTO } from "@infrastructures/dtos/create-post";

export class PostRepository {
  delete: (post_id: Post['id']) => Promise<void>
  create: (payload: CreatePostDTO) => Promise<Post>
  getFeedPosts: (user_ids: User['id'][]) => Promise<Post[]>
  getPostsByUserID: (user_id: User['id']) => Promise<Post[]>
  findById: (post_id: Post['id']) => Promise<Post | undefined>
  updatePhotoFromAllPostFromUserID: (userID: User['id'], filename: string) => Promise<void>
}
