import { Like } from "@domains/entities/like";
import { createRandonString } from "./create_random_string";
import { createUser } from "./create-user";

export const createLike = (user_id: string, post_id: string): Like => {
  return {
    id: createRandonString(),
    user_id,
    post_id,
    user: createUser()
  }
}
