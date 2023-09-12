import { Request, Response } from "express";
import { Post } from "@domains/entities/post";
import { User } from "@domains/entities/user";
import { Comment } from "@domains/entities/comment";
import { getPhotoLink } from "@api/endpoints/user/middlewares/transform-photo-url";
import { Reply } from "@domains/entities/reply";

const mapComment = (req: Request, comment: Comment): Comment => {
  const { user, replies, ...restOfComment } = comment;
  const userWithPhotoUrl = mapUserWithPhotoUrl(req, user);

  return {
    user: userWithPhotoUrl,
    replies: replies.map(reply => mapReply(req, reply)),
    ...restOfComment,
  };
};

const mapReply = (req: Request, reply: Reply): Reply => {
  const { user, ...rest } = reply;
  const userWithPhotoUrl = mapUserWithPhotoUrl(req, user);

  return {
    user: userWithPhotoUrl,
    ...rest,
  };
};

const mapUserWithPhotoUrl = (req: Request, user: User | Reply['user']) => {
  const { photo_filename, ...restOfUser } = user;
  const photo_url = getPhotoLink(req, photo_filename!);

  return {
    ...restOfUser,
    photo_url,
  };
};

const mapPost = (req: Request, post: Post & { owner: User }) => {
  const { image, owner, likes, ...data } = post;
  const { username } = owner;

  return {
    ...data,
    image: getPhotoLink(req, image),
    owner: {
      ...mapUserWithPhotoUrl(req, owner),
      username,
    },
    likes: likes.map(like => mapLike(req, like)),
    comments: post.comments?.map(comment => mapComment(req, comment)) ?? [],
  };
};

const mapLike = (req: Request, like: any) => {
  const { user, ...restLike } = like;
  const userWithPhotoUrl = mapUserWithPhotoUrl(req, user);

  return {
    ...restLike,
    user: userWithPhotoUrl,
  };
};

export const injectImageLink = (req: Request, res: Response) => {
  const { post, posts } = res.locals;

  let response;

  if (post) {
    const { image, ...data } = post;

    response = {
      ...data,
      image: getPhotoLink(req, image),
      comments: post.comments?.map((comment: Comment) => mapComment(req, comment)) ?? [],
    };
  } else {
    response = posts.map((post: Post & { owner: User }) => mapPost(req, post));
  }

  return res.json(response);
};
