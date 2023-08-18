import { User } from "@domains/entities/user";

export class CreatePostDTO {
  owner_id: User['id']
  title: string;
  image: string;
}
