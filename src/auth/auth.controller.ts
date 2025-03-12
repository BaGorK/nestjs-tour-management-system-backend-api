import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auth } from './decorator/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AuthType } from './enums/auth-type.enum';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './providers/sign-in/dtos/sign-in.dto';
import { SignUpDto } from './providers/sign-up/dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Sign in a user',
  })
  @ApiBody({
    type: SignInDto,
    description: 'Sign in a user',
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({
    summary: 'Sign up a user',
  })
  @ApiBody({
    type: SignUpDto,
    description: 'Sign up a user',
  })
  @Post('sign-up')
  @Auth(AuthType.None)
  public async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({
    summary: 'Refresh token',
  })
  @ApiBody({
    type: SignInDto,
    description: 'Refresh token',
  })
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
