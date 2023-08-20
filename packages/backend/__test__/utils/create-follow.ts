import { User } from "@domains/entities/user"
import { Follow } from "@domains/entities/follow"

export const createFollow = (follower_id: User['id']): Follow => {
  return {
    follower_id,
    follower_photo: 'photo',
    follower_username: 'username',
    following_photo: 'photo',
    followed_date: new Date(),
    following_id: 'random_id',
    following_username: 'other_username'
  }
}
