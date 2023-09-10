import { User } from "./user";
import { Comment } from "./comment"

export class Reply {
  comment: string;
  comment_id: Comment['id']
  user: Pick<User, "id" | "username" | "photo_filename" | "photo_url">;
}
