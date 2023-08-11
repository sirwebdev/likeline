import { TOKEN_SERVICE_CONTAINER } from '@api/constants/containers';
import { TokenService } from '@domains/interfaces/token-service';
import { ApiRequestError } from '@infrastructures/error-handling/api-request-error';
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

export function authenticateRequest(req: Request, _res: Response, next: NextFunction) {
  const tokenService = container.resolve<TokenService>(TOKEN_SERVICE_CONTAINER);
  const token = extractToken(req);

  if (!token) throw new ApiRequestError('Token is missing', 401)

  if (!verifyToken(token, req, tokenService)) throw new ApiRequestError('Invalid Token', 401)

  next();
}

function extractToken(req: Request): string | undefined {
  return req.headers.authorization?.split(' ')[1];
}

function verifyToken(token: string, req: Request, tokenService: TokenService): boolean {
  try {
    const payload = tokenService.verifyToken<{ id: string }>(token);
    req.user = { id: payload.id };
    return true;
  } catch {
    return false;
  }
}
