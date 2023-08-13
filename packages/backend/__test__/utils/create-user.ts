import { User } from "@domains/entities/user"

export const createUser = () => {
  const user: User = {
    id: 'user_id',
    password: '123',
    email: 'doe@email.com',
    username: 'I_doe',
    name: 'Jonh Doe'
  }

  return user
} 
