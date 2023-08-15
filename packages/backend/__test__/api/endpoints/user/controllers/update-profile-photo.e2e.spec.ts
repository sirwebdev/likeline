import path from "path"
import { SuperTest, Test } from "supertest"


import { User } from "@domains/entities/user"
import { GLOBAL_PREFIX } from "@infrastructures/constants/server"
import { FSFileService } from "@domains/services/file/fs-service"
import { getApiForTest } from "../../../../utils/get-api-for-test"
import { createAndAuthenticateUser } from "../../../../utils/authenticate-user"
import { TypeormUserRepository } from "@infrastructures/typeorm/repositories/user"

let user: User
let token: string
let api: SuperTest<Test>
let temp_filename: string | undefined

const BASE_URL = `${GLOBAL_PREFIX}/users`

describe("CONTROLLER - UpdateProfilePhoto", () => {
  const filename = path.resolve(__dirname, '../temp/abc.json');

  beforeAll(async () => {
    api = await getApiForTest()

    const authentication = await createAndAuthenticateUser(api)
    user = authentication.user
    token = authentication.token
  })

  describe("Successful cases", () => {
    afterEach(async () => {
      if (temp_filename) {
        const fileServerService = new FSFileService()
        await fileServerService.deleteFile(temp_filename)
        temp_filename = undefined
      }

    })

    it("Must update profile photo", async () => {
      const { body } = await api.put(`${BASE_URL}/profile-photo`).attach('photo', filename).set({
        Authorization: `Bearer ${token}`
      })

      temp_filename = body.photo_filename

      expect(body.photo_url).toEqual(expect.stringContaining(`api/images/${user.id}_profile.json`))
    })
  })

  describe("Error cases", () => {
    it("must return '404' and 'User profile not exists'", async () => {
      const repository = new TypeormUserRepository()
      await repository.deleteById(user.id)

      const { body, status } = await api.put(`${BASE_URL}/profile-photo`).attach('photo', filename).set({
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
