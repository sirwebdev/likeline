declare namespace Express {
  export interface Locals {
    user: {
      photo_filename?: string
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
