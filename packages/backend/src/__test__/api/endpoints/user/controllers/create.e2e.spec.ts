import { SuperTest, Test } from "supertest"
import { getApiForTest } from "../../../../utils/get-api-for-test"
import { createUniqueUserPayload } from "../../../../utils/create-unique-user-payload"

import { GLOBAL_PREFIX } from "@infrastructures/constants/server"
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

  describe("Error cases", () => {
    let existingUserPayload: CreateUserDTO;

    const CONFLICT_STATUS_CODE = 409
    const BAD_REQUEST_STATUS_CODE = 400

    beforeAll(async () => {
      existingUserPayload = createUniqueUserPayload();

      await api.post(BASE_URL).send(existingUserPayload);
    })

    it("Must not create a user with an existing email", async () => {
      const newUserPayload = createUniqueUserPayload();
      newUserPayload.email = existingUserPayload.email;

      const { body, status } = await api.post(BASE_URL).send(newUserPayload)

      expect(status).toEqual(CONFLICT_STATUS_CODE)
      expect(body).toEqual(expect.objectContaining({ message: "User already exists with this email", status: CONFLICT_STATUS_CODE }))
    })

    it("Must not create a user with an existing username", async () => {
      const newUserPayload = createUniqueUserPayload();
      newUserPayload.username = existingUserPayload.username;

      const { body, status } = await api.post(BASE_URL).send(newUserPayload)

      expect(status).toEqual(CONFLICT_STATUS_CODE)
      expect(body).toEqual(expect.objectContaining({ message: "User already exists with this username", status: CONFLICT_STATUS_CODE }))
    })

    it("Password and confirm password must match", async () => {
      const newUserPayload = createUniqueUserPayload();
      newUserPayload.confirmPassword = 'different password';

      const { body, status } = await api.post(BASE_URL).send(newUserPayload)

      expect(status).toEqual(BAD_REQUEST_STATUS_CODE)
      expect(body).toEqual(expect.objectContaining({ message: "Confirm password does not match with password", status: BAD_REQUEST_STATUS_CODE }))
    })
  })
})
