import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { createRandonString } from "./create_random_string";

export const createPost = (user_id: User['id']): Post => {
  return {
    id: createRandonString(),
    owner_id: user_id,
    title: 'Some Random Title',
    image: `${createRandonString()}.png`,
    likes: []
  }
}
