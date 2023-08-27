import fs from 'fs'
import path from "path";
import { SuperTest, Test } from 'supertest';
import { createAndAuthenticateUser } from '../../../../utils/authenticate-user';
import { GLOBAL_PREFIX } from '@infrastructures/constants/server';

export const createPostForE2ETest = async (api: SuperTest<Test>) => {
  const imagePath = path.join(__dirname, '../../post/temp/image.test');
  const imageFile = fs.createReadStream(imagePath)

  const authenticatedUser = await createAndAuthenticateUser(api);

  const payload = {
    title: "Some random pst",
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
