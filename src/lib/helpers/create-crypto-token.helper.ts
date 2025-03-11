import * as crypto from 'crypto';

export function CreateCryptoToken() {
  return crypto.randomBytes(32).toString('hex');
}
