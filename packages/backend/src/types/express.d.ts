declare namespace Express {
  export interface Locals {
    user: {
      photo_filename?: string
    },
    reply: {
      comment: string;
      comment_id: string;
      user: {
        id: string;
        username: string;
        photo_filename?: string;
        photo_url?: string | null
      }
    }
  }

  export interface Request {
    user: {
      id: string;
    };
    follow: {
      follower_photo: string;
      following_photo: string;
    }
  }

  export interface Response {
    locals: Locals
  }
}
