import { Follow } from "@domains/entities/follow";

export class ProfileWithPhotoUrl {
  id: string;
  name: string;
  email: string;
  username: string;
  photo_url: string;
  followers: Follow[]
  following: Follow[]
}
