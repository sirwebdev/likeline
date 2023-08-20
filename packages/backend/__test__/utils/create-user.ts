import { User } from "@domains/entities/user"
import { createRandonString } from "./create_random_string"

export const createUser = () => {
  const randomString = createRandonString()

  const user: User = {
    id: `user_id_${randomString}`,
    password: '123',
    email: `doe_${randomString}@email.com`,
    username: `I_doe_${randomString}`,
    name: 'Jonh Doe',
  }

  return user
} 
