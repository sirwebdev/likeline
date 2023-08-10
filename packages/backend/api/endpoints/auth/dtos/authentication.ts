import { User } from "@domains/entities/user";

export class AuthenticationDTO {
  email: User['email']
  password: User['password']
}
