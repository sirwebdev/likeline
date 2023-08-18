import { User } from "./user";

export class Post {
  owner_id: User['id'];
  title: string;
  image: string;
}
