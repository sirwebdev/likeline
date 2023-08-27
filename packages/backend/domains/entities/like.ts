import { User } from "./user";

export class Like {
  id: string;
  user_id: string;
  post_id: string;
  user: User
}
