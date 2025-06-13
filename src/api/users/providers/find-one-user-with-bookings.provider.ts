import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserWithBookingsProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneUserWithBooking(id: string) {
    console.log('find one user with booking history...');

    let user: User | undefined;

    try {
      user = await this.usersRepository.findOne({
        where: { id },
        relations: {
          bookings: true,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find a user with booking history.',
      );
    }

    if (!user) {
      throw new NotFoundException(`User by user ID: ${id} not found.`);
    }

    return {
      status: 'success',
      message: 'find one user with booking history successfull',
      data: user,
    };
  }
}
