import { NextFunction, Request, Response } from 'express';

import { ApiRequestError } from './api-request-error';

export function CentralizedErrorHandler(err: Error, _req: Request, res: Response, __next: NextFunction) {
  if (err instanceof ApiRequestError) {
    return res.status(err.statusCode).json({ message: err.message, status: err.statusCode });
  }

  console.error(err)

  return res.status(500).json({ message: 'An unexpected error occurred', status: 500 });
}
