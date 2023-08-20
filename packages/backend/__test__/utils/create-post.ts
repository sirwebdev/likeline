import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";

export const createPost = (user_id: User['id']): Post => {
  return {
    owner_id: user_id,
    title: 'Some Random Title',
    image: 'some-image.png'
  }
}
