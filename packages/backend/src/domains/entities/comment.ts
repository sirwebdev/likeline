import { Reply } from "./reply";
import { User } from "./user";

export class Comment {
  id: string;
  comment: string;
  post_id: string;
  replies: Reply[];
  user: Pick<User, "id" | "username" | "photo_filename" | "photo_url">;
}
