import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  // hash password
  abstract hashPassword(data: string | Buffer): Promise<string>;

  // compare password
  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
