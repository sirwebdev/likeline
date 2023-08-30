import { SuperTest, Test } from 'supertest';

import { getImageFile } from '../../../../utils/get-image-file';
import { GLOBAL_PREFIX } from '@infrastructures/constants/server';
import { createAndAuthenticateUser } from '../../../../utils/authenticate-user';

export const createPostForController = async (api: SuperTest<Test>) => {
  const imageFile = getImageFile()

  const authenticatedUser = await createAndAuthenticateUser(api);

  const payload = {
    title: "Some random post",
    image: imageFile
  };

  const { body } = await api.post(`${GLOBAL_PREFIX}/posts`)
    .field('title', payload.title)
    .attach('image', payload.image)
    .set('Authorization', `Bearer ${authenticatedUser.token}`)

  return {
    post: body,
    ...authenticatedUser
  }
}
