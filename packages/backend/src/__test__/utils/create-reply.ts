import { createUser } from "./create-user"
import { Reply } from "@domains/entities/reply"
import { Comment } from "@domains/entities/comment"

export const createReply = (comment_id: Comment['id']): Reply => {
  const user = createUser()

  return {
    comment_id,
    comment: 'Random Comment',
    user: {
      id: user.id,
      photo_url: null,
      username: user.username
    }
  }
}
