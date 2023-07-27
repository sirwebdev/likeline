import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user";

export function getRandomString(length: number) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function createUniqueUserPayload(): CreateUserDTO {
  const randomString = getRandomString(5);

  return {
    name: 'John Doe',
    username: `_doe_${randomString}`,
    email: `doe_${randomString}@email.com`,
    password: '123',
    confirmPassword: '123',
  };
}
