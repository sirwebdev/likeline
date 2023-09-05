import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user";
import { createRandonString } from "./create_random_string";

export function createUniqueUserPayload(): CreateUserDTO {
  const randomString = createRandonString();

  return {
    name: 'John Doe',
    username: `_doe_${randomString}`,
    email: `doe_${randomString}@email.com`,
    password: '123',
    confirmPassword: '123',
  };
}
