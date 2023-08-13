import { SuperTest, Test } from "supertest"
import { getApiForTest } from "../../../../utils/get-api-for-test"

import { GLOBAL_PREFIX } from "@api/server"
import { User } from "@domains/entities/user"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { createAndAuthenticateUser } from "../../../../utils/authenticate-user"

let api: SuperTest<Test>
let user: User
let token: string

const BASE_URL = `${GLOBAL_PREFIX}/users`

describe("CONTROLLER - CreateUser", () => {
  beforeAll(async () => {
    api = await getApiForTest()

    const authentication = await createAndAuthenticateUser(api)
    user = authentication.user
    token = authentication.token
  })

  describe("Successful cases", () => {
    it("must return the profile of logged user", async () => {
      const { body } = await api.get(`${BASE_URL}/profile`).set({
        Authorization: `Bearer ${token}`
      })

      expect(body).toEqual(user)
    })
  })

  describe("Error cases", () => {
    it("must return '404' and 'User profile not exists'", async () => {
      const repository = new TypeormUserRepository()
      await repository.deleteById(user.id)

      const { body, status } = await api.get(`${BASE_URL}/profile`).set({
        Authorization: `Bearer ${token}`
      })

      expect(body).toEqual({
        message: 'User profile not exists',
        status: 404
      })
      expect(status).toEqual(404)
    })
  })
})
