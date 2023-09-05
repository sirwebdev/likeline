export class TokenService {
  createToken: <T extends object>(payload: T, expiresIn: string | number) => string
  verifyToken: <T extends any>(token: string) => T
}
