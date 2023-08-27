import { Like } from "./like";
import { User } from "./user";

export class Post {
  id: string;
  title: string;
  image: string;
  likes: Like[]
  owner_id: User['id'];
}
