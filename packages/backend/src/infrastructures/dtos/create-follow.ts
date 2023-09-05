import { User } from "@domains/entities/user";

export class CreateFollowDTO {
  follower_id: User['id'];
  follower_username: User['username'];
  follower_photo: User['photo_filename'];

  followee_id: User['id'];
  followee_username: User['id'];
  followee_photo: User['photo_filename'];
}
