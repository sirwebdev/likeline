import { SuperTest, Test } from "supertest";
import { Post } from "@domains/entities/post";
import { GLOBAL_PREFIX } from "@infrastructures/constants/server";
import { getApiForTest } from "../../../../utils/get-api-for-test";
import { createPostForController } from "../utils/create-post-for-controller";

let post: Post;
let token: string;
let api: SuperTest<Test>;

const BASE_URL = `${GLOBAL_PREFIX}/likes`;

describe("CONTROLLER - UnLikePost", () => {
  beforeAll(async () => {
    api = await getApiForTest();

    const response = await createPostForController(api);

    token = response.token;
    post = response.post;
  });

  describe("Successful cases", () => {
    it("Must unlike a liked post", async () => {
      const likeResponse = await api.post(`${BASE_URL}/${post.id}`).set("Authorization", `Bearer ${token}`);

      const likeId = likeResponse.body.id;

      const { body, status } = await api.delete(`${BASE_URL}/${likeId}`).set("Authorization", `Bearer ${token}`);

      expect(status).toEqual(204);
      expect(body).toEqual({});
    });
  });

  describe("Error cases", () => {
    it("Must not unlike an unliked post", async () => {
      const likeResponse = await api.post(`${BASE_URL}/${post.id}`).set("Authorization", `Bearer ${token}`);

      const likeId = likeResponse.body.id;

      await api.delete(`${BASE_URL}/${likeId}`).set("Authorization", `Bearer ${token}`);

      const { body, status } = await api.delete(`${BASE_URL}/${likeId}`).set("Authorization", `Bearer ${token}`);

      expect(status).toEqual(404);
      expect(body).toEqual(expect.objectContaining({
        message: "Cannot unlike a non-existent like.",
        status: 404
      }));
    });

    it("Must not unlike if user is not the one who liked it", async () => {
      const likeResponse = await api.post(`${BASE_URL}/${post.id}`).set("Authorization", `Bearer ${token}`);

      const likeId = likeResponse.body.id;

      const otherUserToken = await createPostForController(api).then(response => response.token);

      const { body, status } = await api.delete(`${BASE_URL}/${likeId}`).set("Authorization", `Bearer ${otherUserToken}`);

      expect(status).toEqual(403);
      expect(body).toEqual(expect.objectContaining({
        message: "You cannot unlike someone else's like.",
        status: 403
      }));
    });

    it("Must not unlike if user not exists", async () => {
      const likeResponse = await api.post(`${BASE_URL}/${post.id}`).set("Authorization", `Bearer ${token}`);

      const likeId = likeResponse.body.id;

      await api.delete(`${GLOBAL_PREFIX}/users`).set("Authorization", `Bearer ${token}`);

      const { body, status } = await api.delete(`${BASE_URL}/${likeId}`).set("Authorization", `Bearer ${token}`);

      expect(status).toEqual(404);
      expect(body).toEqual(expect.objectContaining({
        message: "User not exists.",
        status: 404
      }));
    });
  });
});
