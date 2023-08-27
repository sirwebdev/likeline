import { getPhotoLink } from "@api/endpoints/user/middlewares/transform-photo-url"
import { Post } from "@domains/entities/post"
import { User } from "@domains/entities/user"
import { Request, Response } from "express"

export const injectImageLink = (req: Request, res: Response) => {
  const { post, posts } = res.locals

  let response

  if (post) {
    const { image, ...data } = post

    response = {
      ...data,
      image: getPhotoLink(req, image)
    }
  } else {
    response = posts.map((post: Post & { owner: User }) => {
      const { image, owner, likes, ...data } = post
      const { username } = owner

      return {
        ...data,
        image: getPhotoLink(req, image),
        owner: {
          username,
          photo_url: getPhotoLink(req, owner.photo_filename),
        },
        likes: likes.map(like => {
          const { user, ...restLike } = like
          const { photo_filename, ...restUser } = user

          return {
            ...restLike,
            user: {
              ...restUser,
              photo_url: getPhotoLink(req, photo_filename)
            }
          }
        })
      }
    })
  }

  return res.json(response)
}
