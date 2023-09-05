import { SuperTest, Test } from "supertest"


import { User } from "@domains/entities/user"
import { GLOBAL_PREFIX } from "@infrastructures/constants/server"
import { getApiForTest } from "../../../../utils/get-api-for-test"
import { authenticateUser } from "../../../../utils/authenticate-user"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"
import { getImageFile } from "../../../../utils/get-image-file"

let user: User
let token: string
let api: SuperTest<Test>

const BASE_URL = `${GLOBAL_PREFIX}/users`

describe("CONTROLLER - UpdateProfilePhoto", () => {
  beforeAll(async () => {
    api = await getApiForTest()

    const authentication = await authenticateUser(api)
    user = authentication.user
    token = authentication.token
  })

  describe("Successful cases", () => {
    it("Must update profile photo", async () => {
      const { body } = await api.put(`${BASE_URL}/profile-photo`).attach('photo', getImageFile()).set({
        Authorization: `Bearer ${token}`
      })

      expect(body.photo_url).toEqual(expect.stringContaining(`api/images/${user.id}_profile.test`))
    })
  })

  describe("Error cases", () => {
    it("must return '404' and 'User profile not exists'", async () => {
      const repository = new TypeormUserRepository()
      await repository.deleteById(user.id)

      const { body, status } = await api.put(`${BASE_URL}/profile-photo`).attach('photo', getImageFile()).set({
        Authorization: `Bearer ${token}`
      })

      expect(body).toEqual({
        message: 'User not exists',
        status: 404
      })
      expect(status).toEqual(404)
    })
  })

})
