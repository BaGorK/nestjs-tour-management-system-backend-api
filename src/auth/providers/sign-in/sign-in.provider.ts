import {
  BadRequestException,
  forwardRef,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthProviderEnum } from 'src/users/enums/auth-provider.enum';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from '../hash-password/hashing.provider';
import { GenerateTokenProvider } from '../jwt-token/generate-token.provider';
import { SignInDto } from './dtos/sign-in.dto';
import { StaffService } from 'src/staff/providers/staff.service';

export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly staffService: StaffService,

    private readonly hashingProvider: HashingProvider,

    private readonly generateTokenProvider: GenerateTokenProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    console.log('sign in user...');
    try {
      const { email, password } = signInDto;

      // find a user by email
      const staff = await this.staffService.findOneStaffBy({
        email,
      });

      const user = await this.usersService.findOneUserBy({
        email,
      });

      if (!staff && !user) {
        throw new BadRequestException('Invalid credentials');
      }

      // check if user signed up via email
      if (!staff && user.authProvider !== AuthProviderEnum.EMAIL) {
        throw new UnprocessableEntityException(
          `need login via ${user.authProvider} provider, please sign in via ${user.authProvider} provider`,
        );
      }

      // compare the password
      const isPasswordValid = await this.hashingProvider.comparePassword(
        password,
        staff.password || user.password,
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
