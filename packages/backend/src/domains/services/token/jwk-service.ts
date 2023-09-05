import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import { TokenService } from '@domains/interfaces/token-service';

@injectable()
export class JwtService implements TokenService {
  private readonly jwtSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  }

  createToken<T extends object>(payload: T, expiresIn: string | number = '1d'): string {
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn });

    return token;
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
