import { User } from "@domains/entities/user";

export class DeleteFollowDTO {
  follower_id: User['id']
  followee_id: User['id']
}
