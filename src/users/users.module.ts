import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/crud/create-user.provider';
import { FindAllUsersProvider } from './providers/crud/find-all-users.provider';
import { UpdateUserProvider } from './providers/crud/update-user.provider';
import { FindOneUserByProvider } from './providers/find-one-user-by.provider';
import { FindOneUserWithBookingsProvider } from './providers/find-one-user-with-bookings.provider';
import { CreateGoogleUserProvider } from './providers/social/create-google-user.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { FindCurrentActiveUserProvider } from './providers/current/find-current-active-user.provider';

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
  ],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
