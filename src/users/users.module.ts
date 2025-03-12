import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/crud/create-user.provider';
import { FindAllUsersProvider } from './providers/crud/find-all-users.provider';
import { UpdateUserProvider } from './providers/crud/update-user.provider';
import { FindCurrentActiveUserProvider } from './providers/current/find-current-active-user.provider';
import { ForgotMyPasswordProvider } from './providers/current/forgot-my-password.provider';
import { ResetMyPasswordProvider } from './providers/current/reset-my-password.provider';
import { UpdateMeProvider } from './providers/current/update-me.provider';
import { UpdateMyPasswordProvider } from './providers/current/update-my-password.provider';
import { FindOneUserByProvider } from './providers/find-one-user-by.provider';
import { FindOneUserWithBookingsProvider } from './providers/find-one-user-with-bookings.provider';
import { CreateGoogleUserProvider } from './providers/social/create-google-user.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { EmailModule } from 'src/common/email/email.module';
import { TwilioModule } from 'src/common/twilio/twilio.module';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserProvider,
    FindAllUsersProvider,
    UpdateUserProvider,
    FindOneUserByProvider,
    CreateGoogleUserProvider,
    FindOneUserWithBookingsProvider,
    FindCurrentActiveUserProvider,
    UpdateMyPasswordProvider,
    ForgotMyPasswordProvider,
    ResetMyPasswordProvider,
    UpdateMeProvider,
  ],
  imports: [
    EmailModule,
    TwilioModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    FileUploadModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
