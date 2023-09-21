import { SuperTest, Test } from "supertest"

import { GLOBAL_PREFIX } from "@infrastructures/constants/server"
import { getApiForTest } from "../../../../utils/get-api-for-test"
import { authenticateUser } from "../../../../utils/authenticate-user"
import { User } from "@domains/entities/user"
import { Post } from "@domains/entities/post"
import { Comment } from "@domains/entities/comment"
import { getImageFile } from "../../../../utils/get-image-file"

const createPost = async (token: string, api: SuperTest<Test>): Promise<Post> => {
  const { body } = await api.post(`${GLOBAL_PREFIX}/posts`)
    .set('Authorization', `Bearer ${token}`)
    .field('title', 'Title')
    .attach('image', getImageFile())

  return body
}

const commentPost = async (token: string, post_id: Post['id'], api: SuperTest<Test>): Promise<Comment> => {
  const { body } = await api.post(`${GLOBAL_PREFIX}/comments`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      post_id,
      comment: 'Some Comment'
    })

  return body
}

let token: string
let api: SuperTest<Test>

const BASE_URL = `${GLOBAL_PREFIX}/users`


describe("CONTROLLER - DeleteUser", () => {
  beforeAll(async () => {
    api = await getApiForTest()

    const authentication = await authenticateUser(api)
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

  interface AuthenticatedUser {
    token: string;
    user: User
  }

  describe('Data treatment', () => {
    let firstUser: AuthenticatedUser
    let secondUser: AuthenticatedUser

    beforeEach(async () => {
      firstUser = await authenticateUser(api)
      secondUser = await authenticateUser(api)
    })

    it("Must not delete other user comment when user deletes him account", async () => {
      // Create a new Post
      const post = await createPost(firstUser.token, api)
      // Comment the newest created post
      const firstUserComment = await commentPost(firstUser.token, post.id, api)
      // Comment the same post with other user account
      await commentPost(secondUser.token, post.id, api)

      // Delete the other user account
      await api.delete(BASE_URL).set('Authorization', `Bearer ${secondUser.token}`)

      // Check if post still have the owner comment
      const { body: [postResponse] } = await api.get(`${GLOBAL_PREFIX}/posts`).set('Authorization', `Bearer ${firstUser.token}`)
      expect(postResponse.comments).toEqual(expect.arrayContaining([expect.objectContaining({
        id: firstUserComment.id,
        user: expect.objectContaining({
          id: firstUserComment.user.id
        })
      })]))
      expect(postResponse.comments).toHaveLength(1)
    })
  })
})
