import { User } from "@domains/entities/user";
import { Follow } from "@domains/entities/follow";
import { CreateFollowDTO } from "@infrastructures/dtos/create-follow";
import { DeleteFollowDTO } from "@infrastructures/dtos/delete-follow";

export class FollowRepository {
  delete: (payload: DeleteFollowDTO) => Promise<void>
  create: (payload: CreateFollowDTO) => Promise<Follow>
  getFollowers: (follower_id: User['id']) => Promise<Follow[]>
  deleteAllByUserId: (follower_id: User['id']) => Promise<void>
  getFollowings: (follower_id: User['id']) => Promise<Follow[]>
  checkIsFollowing: (follower_id: User['id'], followee: User['id']) => Promise<boolean>
  updatePhotoFromAllFollowOfUserID: (user_id: User['id'], filename: string) => Promise<void>
}
