import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllUsersProvider {
  constructor(
    /**
     * Inject Users Repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findAll() {
    console.log('find all users...');
    try {
      const users = await this.usersRepository.find();
      return {
        status: 'success',
        message: 'find all user',
        data: users,
      };
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException(
        (err as Error).message ||
          'Unable to find all users at the moment please try again.',
      );
    }
  }
}
