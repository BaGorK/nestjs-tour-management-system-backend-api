import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { SignUpProvider } from './providers/sign-up.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider, // when the HashingProvider is requested, return the BcryptProvider
      useClass: BcryptProvider,
    },
    SignInProvider,
    SignUpProvider,
  ],
  exports: [AuthService, HashingProvider],
})
export class AuthModule {}
