import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneUserByProvider {
  constructor(
    /**
     * Inject Users Repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneUserBy(options: Partial<User>) {
    console.log('find one user by condition');
    try {
      return await this.usersRepository.findOneBy(options);
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException(
        (err as Error).message ||
          'Unable to find user at the moment please try again.',
      );
    }
  }
}
