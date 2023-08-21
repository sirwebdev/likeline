import { User } from "./user";

export class Post {
  id: string;
  title: string;
  image: string;
  owner_id: User['id'];
}
