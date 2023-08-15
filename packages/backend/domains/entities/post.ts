import { User } from "./user";

export class Post {
  owner: User['id'];
  title: string;
  image: string;
}
