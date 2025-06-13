import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/api/auth/providers/hash-password/hashing.provider';
import { UpdatePasswordDto } from 'src/api/users/dtos/update-password.dto';
import { User } from 'src/api/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateMyPasswordProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly hashingProvider: HashingProvider,
  ) {}

  public async updateMyPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    console.log('update my password provider...');

    const { passwordConfirm, oldPassword, newPassword } = updatePasswordDto;

    if (newPassword !== passwordConfirm) {
      throw new BadRequestException(
        'Make sure to confirm you password correctly.',
      );
    }

    let user: User | undefined;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (err) {
      console.log(err);
      console.log('Unable to find a user, please try again later.');
    }

    if (
      !(await this.hashingProvider.comparePassword(oldPassword, user.password))
    ) {
      throw new BadRequestException(
        'Invalid cridential, make sure to set old password correctly',
      );
    }

    try {
      user.password = await this.hashingProvider.hashPassword(newPassword);
      user = await this.usersRepository.save(user);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to update password, please try again later.',
      );
    }

    return {
      status: 'success',
      message: 'password updated successfully',
      data: user,
    };
  }
}
