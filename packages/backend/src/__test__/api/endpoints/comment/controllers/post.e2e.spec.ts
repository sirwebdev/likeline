import { SuperTest, Test } from "supertest"

import { User } from "@domains/entities/user"
import { Post } from "@domains/entities/post"
import { getImageFile } from "../../../../utils/get-image-file"
import { GLOBAL_PREFIX } from "@infrastructures/constants/server"
import { getApiForTest } from "../../../../utils/get-api-for-test"
import { authenticateUser } from "../../../../utils/authenticate-user"

let USER: User
let POST: Post
let token: string
let api: SuperTest<Test>

const BASE_URL = `${GLOBAL_PREFIX}/comments`

describe("CONTROLLER - CommentPost", () => {
  beforeAll(async () => {
    api = await getApiForTest()

    const authenticatedResponse = await authenticateUser(api)

    USER = authenticatedResponse.user
    token = authenticatedResponse.token

    const postResponse = await api.post(`${GLOBAL_PREFIX}/posts`)
      .field('title', 'some random title')
      .attach('image', getImageFile())
      .set('Authorization', `Bearer ${token}`)

    POST = postResponse.body
  })

  const COMMENT = 'Some random comment'

  describe("Successful cases", () => {
    it("Must comment a post", async () => {
      const { body, status } = await api.post(BASE_URL)
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: COMMENT,
          post_id: POST.id
        })

      expect(status).toEqual(201)
      expect(body).toEqual(expect.objectContaining({
        comment: COMMENT,
        post_id: POST.id,
        user_id: USER.id
      }))
    })
  })

  describe('Error cases', () => {
    it("Must not comment a post if post not exists", async () => {
      const { body, status } = await api.post(BASE_URL)
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: COMMENT,
          post_id: 'non-existent-post'
        })

      expect(status).toEqual(404)
      expect(body).toEqual(expect.objectContaining({
        message: 'Post not exists',
        status: 404
      }))
    })

    it("Must not comment a post if user not exists", async () => {
      await api.delete(`${GLOBAL_PREFIX}/users`).set('Authorization', `Bearer ${token}`)

      const { body, status } = await api.post(BASE_URL)
        .set('Authorization', `Bearer ${token}`)
        .send({
          comment: COMMENT,
          post_id: POST.id
        })

      expect(status).toEqual(404)
      expect(body).toEqual(expect.objectContaining({
        message: 'User not exists',
        status: 404
      }))
    })
  })
})
