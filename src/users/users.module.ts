import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserProvider } from './providers/crud/create-user.provider';
import { FindAllUsersProvider } from './providers/crud/find-all-users.provider';
import { FindOneUserByProvider } from './providers/find-one-user-by.provider';
import { UpdateUserProvider } from './providers/crud/update-user.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CreateGoogleUserProvider } from './providers/social/create-google-user.provider';
import { FindOneUserWithBookings } from './providers/find-one-user-with-bookings';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserProvider,
    FindAllUsersProvider,
    UpdateUserProvider,
    FindOneUserByProvider,
    CreateGoogleUserProvider,
    FindOneUserWithBookings,
  ],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
