import { User } from "./user";

export class Reply {
  id: string;
  comment: string;
  user: Pick<User, "id" | "username" | "photo_filename" | "photo_url">;
}
