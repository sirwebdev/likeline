import { Follow } from "@domains/entities/follow";

export class ProfileDTO {
  id: string;
  name: string;
  email: string;
  username: string;
  photo_filename?: string;
  followers: Follow[]
  following: Follow[]
}
