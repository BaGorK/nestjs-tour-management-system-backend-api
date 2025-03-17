import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffModule } from 'src/staff/staff.module';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/hash-password/bcrypt.provider';
import { HashingProvider } from './providers/hash-password/hashing.provider';
import { GenerateTokenProvider } from './providers/jwt-token/generate-token.provider';
import { RefreshTokensProvider } from './providers/jwt-token/refresh-tokens.provider';
import { SignInProvider } from './providers/sign-in/sign-in.provider';
import { SignUpProvider } from './providers/sign-up/sign-up.provider';
import { GoogleAuthenticationController } from './social/google-authentication.controller';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';

@Module({
  controllers: [AuthController, GoogleAuthenticationController],
  providers: [
    AuthService,
    SignInProvider,
    SignUpProvider,
    {
      provide: HashingProvider, // when the HashingProvider is requested, return the BcryptProvider
      useClass: BcryptProvider,
    },
    GenerateTokenProvider,
    RefreshTokensProvider,
    GoogleAuthenticationService,
  ],
  exports: [AuthService, HashingProvider],
  imports: [
    FileUploadModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UsersModule),
    forwardRef(() => StaffModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
