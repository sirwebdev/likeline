import { SuperTest, Test } from "supertest"

import { GLOBAL_PREFIX } from "@api/server"
import { createAndAuthenticateUser } from "../../../../utils/authenticate-user"
import { getApiForTest } from "../../../../utils/get-api-for-test"


let token: string
let api: SuperTest<Test>

const BASE_URL = `${GLOBAL_PREFIX}/users`

describe("CONTROLLER - DeleteUser", () => {
  beforeAll(async () => {
    api = await getApiForTest()

    const authentication = await createAndAuthenticateUser(api)
    token = authentication.token
  })

  describe("Successful cases", () => {
    it("Must delete the authenticated user", async () => {
      const { status } = await api.delete(BASE_URL).set({
        Authorization: `Bearer ${token}`
      })

      expect(status).toEqual(204)
    })
  })

  describe("Error cases", () => {
    it("Must not delete a non existent user", async () => {
      const { status, body } = await api.delete(BASE_URL).set({
        Authorization: `Bearer ${token}`
      })

      expect(body).toMatchObject({
        message: 'User not exists',
        status: 404
      })
      expect(status).toEqual(404)
    })
  })
})
