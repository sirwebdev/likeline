import { Like } from "./like";
import { User } from "./user";
import { Comment } from "./comment";

export class Post {
  id: string;
  title: string;
  image: string;
  likes: Like[]
  comments: Comment[]
  owner_id: User['id'];
}
