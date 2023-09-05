import { Post } from "./post";
import { User } from "./user";

export class Comment {
  id: string;
  user: User;
  post: Post;
  comment: string;
  user_id: string;
}
