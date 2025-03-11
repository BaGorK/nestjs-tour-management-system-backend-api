import * as crypto from 'crypto';

export function CreateCryptoHash(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
