import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/api/users/providers/users.service';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { SignInDto } from './sign-in/dtos/sign-in.dto';
import { RefreshTokensProvider } from './jwt-token/refresh-tokens.provider';
import { SignInProvider } from './sign-in/sign-in.provider';
import { SignUpDto } from './sign-up/dtos/sign-up.dto';
import { SignUpProvider } from './sign-up/sign-up.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly signInProvider: SignInProvider,

    private readonly signUpProvider: SignUpProvider,

    private readonly refreshTokenProvider: RefreshTokensProvider,
  ) {}

  public signIn(signInDto: SignInDto) {
    return this.signInProvider.signIn(signInDto);
  }

  public signUp(signUpDto: SignUpDto) {
    return this.signUpProvider.signUp(signUpDto);
  }

  public refreshToken(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenProvider.refreshToken(refreshTokenDto);
  }
}
