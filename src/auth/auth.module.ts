import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { GenerateTokenProvider } from './providers/generate-token.provider';
import { HashingProvider } from './providers/hashing.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { SignUpProvider } from './providers/sign-up.provider';
import { GoogleAuthenticationController } from './social/google-authentication.controller';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';

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
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
