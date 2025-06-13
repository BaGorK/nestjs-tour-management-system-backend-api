import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} from '../constants/cookie-names.constant';
import { Auth } from '../decorator/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { GoogleAuthenticationService } from './providers/google-authentication.service';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  public async authenticate(
    @Body() googleTokenDto: GoogleTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data =
      await this.googleAuthenticationService.authenticate(googleTokenDto);
    // Set access token as an HTTP-only secure cookie
    res.cookie(ACCESS_TOKEN, data.accessToken, {
      httpOnly: true,
      secure: true, // Ensure secure (HTTPS) in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // Set refresh token as an HTTP-only secure cookie
    res.cookie(REFRESH_TOKEN, data.refreshToken, {
      httpOnly: true,
      secure: true, // Ensure secure (HTTPS) in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return data;
  }
}
