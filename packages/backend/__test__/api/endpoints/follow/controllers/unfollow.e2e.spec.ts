import { SuperTest, Test } from "supertest";

import { User } from "@domains/entities/user";
import { GLOBAL_PREFIX } from "@infrastructures/constants/server";
import { getApiForTest } from "../../../../utils/get-api-for-test";
import { createAndAuthenticateUser } from "../../../../utils/authenticate-user";
import { createUniqueUserPayload } from "../../../../utils/create-unique-user-payload";

let token: string;
let follower: User
let followee: User
let api: SuperTest<Test>;

const BASE_URL = `${GLOBAL_PREFIX}/follow`;

describe("CONTROLLER - CreateFollow", () => {
  beforeAll(async () => {
    api = await getApiForTest();

    const authenticatedUser = await createAndAuthenticateUser(api);

    token = authenticatedUser.token;
    follower = authenticatedUser.user;

    const { body } = await api.post(`${GLOBAL_PREFIX}/users`).send(createUniqueUserPayload());
    followee = body;
  });

  describe("Successful cases", () => {
    it("Must unfollow if already following", async () => {
      const payload = { followee_id: followee.id };

      await api.post(BASE_URL)
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      const { status } = await api.delete(BASE_URL)
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(status).toEqual(204);
    });
  });

  describe("Error cases", () => {
    it("Must not allow user to unfollow themselves", async () => {
      const payload = { followee_id: follower.id };

      const { body, status } = await api.delete(BASE_URL)
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(status).toEqual(400);
      expect(body.message).toEqual('You cannot unfollow yourself');
    });

    it("Must not allow unfollow if followee not found", async () => {
      const payload = { followee_id: "non_existent_id" };

      const { body, status } = await api.delete(BASE_URL)
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(status).toEqual(404);
      expect(body.message).toEqual('Followee not found');
    });

    it("Must not allow following if already following this user", async () => {
      const payload = { followee_id: followee.id };

      await api.delete(BASE_URL)
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      const { status, body } = await api.delete(BASE_URL)
        .set("Authorization", `Bearer ${token}`)
        .send(payload);

      expect(status).toEqual(409);
      expect(body.message).toEqual('You are already not following this user');
    });

    it("Must not allow following if follower not found", async () => {
      await api.delete(`${GLOBAL_PREFIX}/users`).set("Authorization", `Bearer ${token}`)

      const { body, status } = await api.delete(BASE_URL)
        .set("Authorization", `Bearer ${token}`)
        .send({ followee_id: followee.id });

      expect(status).toEqual(404);
      expect(body.message).toEqual('Follower not found');
    });
  });
});
