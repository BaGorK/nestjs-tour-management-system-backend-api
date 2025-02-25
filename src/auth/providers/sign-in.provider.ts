import { BadRequestException, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { GenerateTokenProvider } from './generate-token.provider';
import { HashingProvider } from './hashing.provider';

export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,

    private readonly generateTokenProvider: GenerateTokenProvider,
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
      const { accessToken, refreshToken } =
        await this.generateTokenProvider.generateToken(user);

      return {
        status: 'success',
        message: 'sign in successful',
        accessToken,
        refreshToken,
        data: user,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(
        (err as Error).message || 'Unable to sign in user at the moment',
      );
    }
  }
}
