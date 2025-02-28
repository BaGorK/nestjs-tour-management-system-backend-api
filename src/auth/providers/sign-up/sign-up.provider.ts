import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/providers/sign-up/dtos/sign-up.dto';
import { pgUniqueVioliationErrCode } from 'src/lib/constants/pg-unique-violation-err-code';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from '../hash-password/hashing.provider';

@Injectable()
export class SignUpProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signUp(signUpDto: SignUpDto) {
    console.log('signup...');

    if (signUpDto.password !== signUpDto.passwordConfirm) {
      throw new BadRequestException(
        'password and password confirm do not match',
      );
    }

    let user = this.usersRepository.create({
      ...signUpDto,
      password: await this.hashingProvider.hashPassword(signUpDto.password),
    });

    try {
      user = await this.usersRepository.save(user);
    } catch (err) {
      console.log(err);
      if (err.code === pgUniqueVioliationErrCode) {
        throw new ConflictException('User already exists');
      }
      throw new ConflictException((err as Error).message || 'Error signing up');
    }

    return {
      status: 'success',
      message: 'User created successfully, please continue to login',
      data: user,
    };
  }
}
