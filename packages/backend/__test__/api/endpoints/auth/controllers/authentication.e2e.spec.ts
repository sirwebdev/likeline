import { SuperTest, Test } from "supertest"
import { getApiForTest } from "../../../../utils/get-api-for-test"
import { CreateUserDTO } from "@api/endpoints/user/dtos/create-user"
import { createUniqueUserPayload } from "../../../../utils/create-unique-user-payload"
import { User } from "@domains/entities/user"

let api: SuperTest<Test>

const createUser = async (payload: CreateUserDTO) => {
  const { body } = await api.post('/api/users').send(payload)
  return body
}

describe("CONTROLLER - Authentication", () => {
  let user: User
  let createUserPayload: CreateUserDTO
  createUserPayload = createUniqueUserPayload()

  beforeAll(async () => {
    api = await getApiForTest()
  })

  describe("Successful cases", () => {
    beforeAll(async () => {
      user = await createUser(createUserPayload)
    })

    it("Must make user authentication and return the JWT token", async () => {
      const { body } = await api.post('/api/auth').send({ email: user.email, password: createUserPayload.password })

      expect(body).toHaveProperty('token')
    })
  })

  describe("Error cases", () => {
    createUserPayload = createUniqueUserPayload()

    beforeAll(async () => {
      user = await createUser(createUserPayload)
    })

    it("Must not authenticate with a non existent user email", async () => {
      const { body } = await api.post('/api/auth').send({
        email: 'non-existent-email@email.com',
        password: user.password
      })

      expect(body).toEqual(expect.objectContaining({
        message: "Invalid email or password.",
        status: 401
      }))
    })

    it("Must not authenticate with an invalid password", async () => {
      const { body } = await api.post('/api/auth').send({
        email: user.email,
        password: 'invalid_password'
      })

      expect(body).toEqual(expect.objectContaining({
        message: "Invalid email or password.",
        status: 401
      }))
    })
  })
})
