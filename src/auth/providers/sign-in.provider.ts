import { BadRequestException, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

export class SignInProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,

    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
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
      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        } as ActiveUserData,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          expiresIn: this.jwtConfiguration.accessTokenTtl,
        },
      );

      return {
        status: 'success',
        message: 'sign in successful',
        accessToken,
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
