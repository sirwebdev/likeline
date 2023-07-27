import { SuperTest, Test } from "supertest"
import { getApiForTest } from "../../../../utils/get-api-for-test"
import { createUniqueUserPayload } from "../../../../utils/create-unique-user-payload"

import { GLOBAL_PREFIX } from "@api/server"
import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user"

let api: SuperTest<Test>
const BASE_URL = `${GLOBAL_PREFIX}/users`

describe("CONTROLLER - CreateUser", () => {
  beforeAll(async () => {
    api = await getApiForTest()
  })

  describe("Successful cases", () => {
    const userPayload: CreateUserDTO = createUniqueUserPayload()

    it("Must create a new user if it does not exist", async () => {
      const { confirmPassword, password, ...expectedResponse } = userPayload

      const { body, status } = await api.post(BASE_URL).send(userPayload)

      expect(status).toEqual(201)
      expect(body).toEqual(expect.objectContaining(expectedResponse))
      expect(body.password).toBeUndefined()
    })
  })

})
