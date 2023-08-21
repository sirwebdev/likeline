import { Request, Response } from "express"

import { getPhotoLink } from "@api/endpoints/user/middlewares/transform-photo-url"

export const injectImageLink = (req: Request, res: Response) => {
  const { follow } = res.locals

  const response = {
    ...follow,
    follower_photo: getPhotoLink(req, follow.follower_photo),
    following_photo: getPhotoLink(req, follow.following_photo)
  }

  return res.json(response)
}
