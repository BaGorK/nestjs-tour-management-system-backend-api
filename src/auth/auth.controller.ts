import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';
import { FileUploadDirNames } from 'src/lib/constants/file-upload-dir-names';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants/cookie-names.constant';
import { Auth } from './decorator/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AuthType } from './enums/auth-type.enum';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './providers/sign-in/dtos/sign-in.dto';
import { SignUpDto } from './providers/sign-up/dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileUploadService: FileUploadService,
  ) {}

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
  public async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signIn(signInDto);
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

  @ApiOperation({
    summary: 'sign out a user',
  })
  @ApiBearerAuth()
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.Bearer)
  public async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN);
    res.clearCookie(REFRESH_TOKEN);

    return {
      status: 'success',
      message: 'Log out successfull.',
      data: {},
    };
  }

  @ApiOperation({
    summary: 'Sign up a user',
  })
  @ApiBody({
    type: SignUpDto,
    description: 'Sign up a user',
    required: true,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'profilePicture',
      FileUploadService.saveImageToStorage({
        dirName: FileUploadDirNames.user,
      }),
    ),
  )
  @Post('sign-up')
  @Auth(AuthType.None)
  public async signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() profilePicture: Express.Multer.File,
  ) {
    if (!profilePicture) {
      throw new BadRequestException('Profile picture is required');
    }

    signUpDto.profilePicture =
      this.fileUploadService.getFilePath(profilePicture);

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
