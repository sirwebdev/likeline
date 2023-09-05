export class EncryptionService {
  hashPassword: (password: string) => Promise<string>;
  comparePasswords: (password: string, hashedPassword: string) => Promise<boolean>
}
