import bcrypt from 'bcrypt';
import { injectable } from 'tsyringe';

import { EncryptionService } from '@domains/interfaces/encription-service';

@injectable()
export class BcryptService implements EncryptionService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }
}
