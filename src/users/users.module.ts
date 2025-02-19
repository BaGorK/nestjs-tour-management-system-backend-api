import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindAllUsersProvider } from './providers/find-all-users.provider';
import { FindOneUserByProvider } from './providers/find-one-user-by.provider';
import { UpdateUserProvider } from './providers/update-user.provider';
import { UsersService } from './providers/users.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserProvider,
    FindAllUsersProvider,
    UpdateUserProvider,
    FindOneUserByProvider,
  ],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
