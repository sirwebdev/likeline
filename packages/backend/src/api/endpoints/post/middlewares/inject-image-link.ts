import { Request, Response } from "express"

import { Post } from "@domains/entities/post"
import { User } from "@domains/entities/user"
import { Comment } from "@domains/entities/comment"
import { getPhotoLink } from "@api/endpoints/user/middlewares/transform-photo-url"

export const injectImageLink = (req: Request, res: Response) => {
  const { post, posts } = res.locals

  let response

  if (post) {
    const { image, ...data } = post


    response = {
      ...data,
      image: getPhotoLink(req, image),
      comments: post.comments?.map((comment: Comment): Comment => {
        const { user: { photo_filename, ...restOfuser }, ...restOfComment } = comment
        return {
          user: {
            ...restOfuser,
            photo_url: getPhotoLink(req, photo_filename!),
          },
          ...restOfComment
        }

      }) ?? []
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
        }),
        comments: post.comments?.map((comment: Comment): Comment => {
          const { user: { photo_filename, ...restOfuser }, ...restOfComment } = comment
          return {
            user: {
              ...restOfuser,
              photo_url: getPhotoLink(req, photo_filename!),
            },
            ...restOfComment
          }

        }) ?? []
      }
    })
  }

  return res.json(response)
}
