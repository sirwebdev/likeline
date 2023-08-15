import { Request, Response } from "express";

import { ProfileWithPhotoUrl } from "../dtos/profile-with-photo-url";
import { GLOBAL_PREFIX, PORT } from "@infrastructures/constants/server";

export const transformPhotoResponse = (req: Request, res: Response) => {
  const user: any = res.locals.user;

  const { photo_filename, ...data } = user

  const response: ProfileWithPhotoUrl = {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    photo_url: user.photo_filename
      ? `${req.protocol}://${req.hostname}:${PORT}${GLOBAL_PREFIX}/images/${user.photo_filename}`
      : '',
    ...data
  };

  return res.json(response);
};
