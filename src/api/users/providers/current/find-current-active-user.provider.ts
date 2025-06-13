import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/api/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindCurrentActiveUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findCurrentActiveUser(id: string) {
    console.log('find currently active user provider...');

    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });

      return {
        status: 'success',
        message: 'find currently active user successfull',
        data: user,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find currently logged in user, please try again later',
      );
    }
  }
}
