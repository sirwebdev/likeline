import { SuperTest, Test } from "supertest";

import { GLOBAL_PREFIX } from "@infrastructures/constants/server";
import { getApiForTest } from "../../../../utils/get-api-for-test";
import { authenticateUser } from "../../../../utils/authenticate-user";
import { getImageFile } from '../../../../utils/get-image-file';

let token: string;
let api: SuperTest<Test>;

const BASE_URL = `${GLOBAL_PREFIX}/posts`;

const imageFile = getImageFile()

describe("CONTROLLER - createPost", () => {
  beforeAll(async () => {

    api = await getApiForTest();

    const authenticatedUser = await authenticateUser(api);

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
