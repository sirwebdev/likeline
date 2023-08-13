import { SuperTest, Test } from "supertest";

import { GLOBAL_PREFIX } from "@infrastructures/constants/server";
import { createUniqueUserPayload } from "./create-unique-user-payload";

export const createAndAuthenticateUser = async (api: SuperTest<Test>) => {
  const USER_PAYLOAD = createUniqueUserPayload()

  const { body: userRequestResponse } = await api.post(`${GLOBAL_PREFIX}/users`).send(USER_PAYLOAD)

  const { body: authenticationRequestResponse } = await api.post(`${GLOBAL_PREFIX}/auth`).send({ email: userRequestResponse.email, password: USER_PAYLOAD.password })

  return { token: authenticationRequestResponse.token, user: userRequestResponse }
}
