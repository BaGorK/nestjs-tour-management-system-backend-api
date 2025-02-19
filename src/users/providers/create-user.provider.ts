import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { FindOneUserByProvider } from './find-one-user-by.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly findOneUserByProvider: FindOneUserByProvider,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    console.log('create user...');

    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new BadRequestException(
        'password and password confirm do not match',
      );
    }

    let user = await this.findOneUserByProvider.findOneUserBy({
      email: createUserDto.email,
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    user = this.usersRepository.create(createUserDto);

    try {
      user = await this.usersRepository.save(user);
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException(
        (err as Error).message ||
          'Unable to create a user at the moment please try again.',
      );
    }

    return {
      status: 'success',
      message: 'create user',
      data: user,
    };
  }
}
