import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import jwtConfig from './config/jwt.config';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { AuthService } from './providers/auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';
import { HashingProvider } from './providers/hashing.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { SignUpProvider } from './providers/sign-up.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SignInProvider,
    SignUpProvider,
    {
      provide: HashingProvider, // when the HashingProvider is requested, return the BcryptProvider
      useClass: BcryptProvider,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  exports: [AuthService, HashingProvider],
  imports: [
    UsersModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
