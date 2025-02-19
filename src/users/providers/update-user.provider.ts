import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { FindOneUserByProvider } from './find-one-user-by.provider';

@Injectable()
export class UpdateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly findOneUserByProvider: FindOneUserByProvider,
  ) {}

  public async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('update user...');
    const user = await this.findOneUserByProvider.findOneUserBy({ id });

    if (!user) {
      throw new BadRequestException('User not found to update');
    }

    // check if email is provided and is different from the current email
    console.log(updateUserDto);
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const userExists = await this.findOneUserByProvider.findOneUserBy({
        email: updateUserDto.email,
      });

      if (userExists) {
        throw new BadRequestException(
          'User already exists with this email, Please use another email',
        );
      }
    }

    // update user details
    // note: to update your password use the update-my-password route
    user.firstName = updateUserDto.firstName ?? user.firstName;
    user.lastName = updateUserDto.lastName ?? user.lastName;
    user.email = updateUserDto.email ?? user.email;

    try {
      const updatedUser = await this.usersRepository.save(user);

      return {
        status: 'success',
        message: 'update user',
        data: updatedUser,
      };
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException(
        (err as Error).message ||
          'Unable to update user at the moment please try again.',
      );
    }
  }
}
