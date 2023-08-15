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
  }

  export interface Response {
    locals: Locals
  }
}
