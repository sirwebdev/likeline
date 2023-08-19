import { Request, Response } from "express";

import { ProfileWithPhotoUrl } from "../dtos/profile-with-photo-url";
import { GLOBAL_PREFIX, PORT } from "@infrastructures/constants/server";
import { Follow } from "@domains/entities/follow";

const getPhotoLink = (req: Request, filename?: string | null): string | null => {
  return filename ? `${req.protocol}://${req.hostname}:${PORT}${GLOBAL_PREFIX}/images/${filename}` : null
}

export const transformPhotoResponse = (req: Request, res: Response) => {
  const user: any = res.locals.user;

  const { photo_filename, followers, followees, ...data } = user

  const response: ProfileWithPhotoUrl = {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    photo_url: getPhotoLink(req, user.photo_filename),
    followers: followers.map((follow: Follow) => ({ ...follow, follower_photo: getPhotoLink(req, follow.follower_photo), following_photo: getPhotoLink(req, follow.following_photo) })),
    followees: followers.map((follow: Follow) => ({ ...follow, follower_photo: getPhotoLink(req, follow.follower_photo), following_photo: getPhotoLink(req, follow.following_photo) })),
    ...data
  };

  return res.json(response);
};
