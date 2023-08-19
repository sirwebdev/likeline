import { Follow } from "@domains/entities/follow";
import { User } from "@domains/entities/user";
import { CreateFollowDTO } from "@infrastructures/dtos/create-follow";

export class FollowRepository {
  create: (payload: CreateFollowDTO) => Promise<Follow>
  getFollowers: (follower_id: User['id']) => Promise<Follow[]>
  getFollowees: (follower_id: User['id']) => Promise<Follow[]>
  checkIsFollowing: (follower_id: User['id'], followee: User['id']) => Promise<boolean>
  updatePhotoFromAllFollowOfUserID: (user_id: User['id'], filename: string) => Promise<void>
}
