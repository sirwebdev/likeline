import { User } from "@domains/entities/user"
import { getRandomString } from "./create-unique-user-payload"

export const createUser = () => {
  const randomString = getRandomString(4)

  const user: User = {
    id: `user_id_${randomString}`,
    password: '123',
    email: `doe_${randomString}@email.com`,
    username: `I_doe_${randomString}`,
    name: 'Jonh Doe',
  }

  return user
} 
