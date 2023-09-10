import { Request, Response } from "express"

import { getPhotoLink } from "@api/endpoints/user/middlewares/transform-photo-url"

export const injectUserPhotoUrl = (req: Request, res: Response) => {
  const { reply } = res.locals

  const { user: { photo_filename, ...user }, ...rest } = reply

  const response = {
    ...rest,
    user: {
      ...user,
      photo_url: getPhotoLink(req, photo_filename)
    }
  }

  return res.json(response)
}
