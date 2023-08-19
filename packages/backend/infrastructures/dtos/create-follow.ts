import { User } from "@domains/entities/user";

export class CreateFollowDTO {
  follower_id: User['id'];
  followee_id: User['id'];
}
