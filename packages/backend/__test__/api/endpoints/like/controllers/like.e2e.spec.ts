import { SuperTest, Test } from "supertest";

import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { GLOBAL_PREFIX } from "@infrastructures/constants/server";
import { getApiForTest } from "../../../../utils/get-api-for-test";
import { createPostForController } from "../utils/create-post-for-controller";

let post: Post;
let user: User;
let token: string;
let api: SuperTest<Test>;

const BASE_URL = `${GLOBAL_PREFIX}/likes`;

describe("CONTROLLER - LikePost", () => {
  beforeAll(async () => {

    api = await getApiForTest();

    const response = await createPostForController(api)

    token = response.token;
    user = response.user;
    post = response.post;
  });

  describe("Successful cases", () => {
    it("Must like an existent post", async () => {
      const { body, status } = await api.post(`${BASE_URL}/${post.id}`)
        .set("Authorization", `Bearer ${token}`)

      expect(status).toEqual(200);
      expect(body).toEqual(expect.objectContaining({ post_id: post.id, user_id: user.id }));
    });
  });

  describe("Error cases", () => {
    it("Must not like and unexistent post", async () => {
      const { body, status } = await api.post(`${BASE_URL}/unexistent-post-id`)
        .set("Authorization", `Bearer ${token}`)

      expect(status).toEqual(404);
      expect(body).toEqual(expect.objectContaining({
        message: "Post not exists",
        status: 404
      }));
    })

    it("Must not like post if post already was liked", async () => {
      const { body, status } = await api.post(`${BASE_URL}/${post.id}`)
        .set("Authorization", `Bearer ${token}`)

      expect(status).toEqual(409);
      expect(body).toEqual(expect.objectContaining({
        message: "Post already liked",
        status: 409
      }));
    })

    it("Must not like post if user not exists", async () => {
      await api.delete(`${GLOBAL_PREFIX}/users`).set('Authorization', `Bearer ${token}`)

      const { body, status } = await api.post(`${BASE_URL}/${post.id}`)
        .set("Authorization", `Bearer ${token}`)

      expect(status).toEqual(404);
      expect(body).toEqual(expect.objectContaining({
        message: "User not exists",
        status: 404
      }));
    })
  })
});
