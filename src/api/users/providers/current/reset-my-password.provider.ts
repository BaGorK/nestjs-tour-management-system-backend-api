import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/api/auth/providers/hash-password/hashing.provider';
import { CreateCryptoHash } from 'src/lib/helpers/create-crypto-hash.helper';
import { ResetPasswordDto } from 'src/api/users/dtos/reset-password.dto';
import { User } from 'src/api/users/user.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class ResetMyPasswordProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly hashingProvider: HashingProvider,
  ) {}

  public async resetMyPassword(
    resetToken: string,
    resetPasswordDto: ResetPasswordDto,
  ) {
    console.log('reset my password ...');

    let user: User | undefined;
    try {
      user = await this.usersRepository.findOne({
        where: {
          resetPasswordToken: CreateCryptoHash(resetToken),
          resetPasswordTokenExpiresAt: MoreThan(new Date()),
        },
      });
    } catch (err) {
      console.error('Error finding user:', err);
      throw new InternalServerErrorException(
        'Unable to find a user. Please try again later.',
      );
    }

    if (!user) {
      throw new BadRequestException(
        'Invalid or expired token. please try again.',
      );
    }

    try {
      user.resetPasswordToken = null;
      user.resetPasswordTokenExpiresAt = null;

      user.password = await this.hashingProvider.hashPassword(
        resetPasswordDto.newPassword,
      );

      await this.usersRepository.save(user);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to reset password, please try again later.',
      );
    }

    return {
      status: 'success',
      message: 'password reset successfull, now you can login to your account.',
      data: {},
    };
  }
}
