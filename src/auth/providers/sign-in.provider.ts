import { BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { HashingProvider } from './hashing.provider';

export class SignInProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    console.log('sign in user...');
    try {
      const { email, password } = signInDto;

      // find a user by email
      const user = await this.usersService.findOneUserBy({
        email,
      });

      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }

      // compare the password
      const isPasswordValid = await this.hashingProvider.comparePassword(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid credentials');
      }

      // jwt sign the user
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        (err as Error).message || 'Unable to sign in user at the moment',
      );
    }
  }
}
