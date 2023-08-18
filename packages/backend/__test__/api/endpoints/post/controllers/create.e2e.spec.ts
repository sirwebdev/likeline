import fs from 'fs'
import path from "path";
import { SuperTest, Test } from "supertest";

import { GLOBAL_PREFIX } from "@infrastructures/constants/server";
import { getApiForTest } from "../../../../utils/get-api-for-test";
import { createAndAuthenticateUser } from "../../../../utils/authenticate-user";

let token: string;
let api: SuperTest<Test>;

const BASE_URL = `${GLOBAL_PREFIX}/posts`;

let imageFile: fs.ReadStream

describe("CONTROLLER - createPost", () => {
  beforeAll(async () => {
    const imagePath = path.join(__dirname, '../temp/image.test');
    imageFile = fs.createReadStream(imagePath)

    api = await getApiForTest();

    const authenticatedUser = await createAndAuthenticateUser(api);

    token = authenticatedUser.token;
  });

  describe("Successful cases", () => {
    it("Must create a new post for a logged user", async () => {
      const payload = {
        title: "Some random Post",
        image: imageFile
      };

      const { body, status } = await api.post(BASE_URL)
        .set("Authorization", `Bearer ${token}`)
        .field("title", payload.title)
        .attach("image", payload.image);

      expect(status).toEqual(201);
      expect(body).toEqual(expect.objectContaining({ title: payload.title }));
    });
  });
});
