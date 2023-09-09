import { Post } from "./post";
import { User } from "./user";

export class Comment {
  id: string;
  comment: string;
  post: Pick<Post, "id" | "title" | "image">;
  user: Pick<User, "id" | "username" | "photo_filename" | "photo_url">;
}
