import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from './decorator/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AuthType } from './enums/auth-type.enum';
import { saveImageToStorage, uploadFileLocal } from './helpers/imag-storage';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './providers/sign-in/dtos/sign-in.dto';
import { SignUpDto } from './providers/sign-up/dtos/sign-up.dto';

@Controller('auth')
@ApiTags('auth')
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: SignUpDto,
    description: 'Sign up a user',
  })
  @Post('sign-up')
  @Auth(AuthType.None)
  @UseInterceptors(
    FileInterceptor('profielPicture', saveImageToStorage({ dirName: 'user' })),
  )
  public async signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() signUpDto: SignUpDto,
  ) {
    console.log(file);
    let filePath = '';

    if (file) {
      filePath = uploadFileLocal(file);
    }

    console.log('filepath...', filePath);

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
