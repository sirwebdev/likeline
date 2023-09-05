import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";

export class CreatePostDTO {
  owner: User['id'];
  title: Post['title'];
  image: Express.Multer.File
}
