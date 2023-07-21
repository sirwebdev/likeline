import { Request, Response } from "express"

import { CreateUserDTO } from "../dtos/create-user"
import { CreateUserService } from "../services/create"

export class CreateUserController {
  static async execute(request: Request, response: Response) {
    const { name, email, password, username, confirmPassword }: CreateUserDTO = request.body

    await CreateUserService.execute({
      name, email, password, username, confirmPassword
    })

    return response.json({ ok: true })
  }
}
