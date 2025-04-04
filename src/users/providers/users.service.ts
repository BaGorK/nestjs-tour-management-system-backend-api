import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { IGoogleUser } from '../interfaces/google-user.interface';
import { User } from '../user.entity';
import { CreateUserProvider } from './crud/create-user.provider';
import { FindAllUsersProvider } from './crud/find-all-users.provider';
import { UpdateUserProvider } from './crud/update-user.provider';
import { FindCurrentActiveUserProvider } from './current/find-current-active-user.provider';
import { ForgotMyPasswordProvider } from './current/forgot-my-password.provider';
import { ResetMyPasswordProvider } from './current/reset-my-password.provider';
import { UpdateMeProvider } from './current/update-me.provider';
import { UpdateMyPasswordProvider } from './current/update-my-password.provider';
import { FindOneUserByProvider } from './find-one-user-by.provider';
import { FindOneUserWithBookingsProvider } from './find-one-user-with-bookings.provider';
import { CreateGoogleUserProvider } from './social/create-google-user.provider';
import { UpdatePasswordDto } from '../dtos/update-password.dto';

/**
 * User Service Provider
 */
@Injectable()
export class UsersService {
  constructor(
    /**
     * Inject Users Repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Inject user providers
     */
    private readonly createUserProvider: CreateUserProvider,
    private readonly findAllUsersProvider: FindAllUsersProvider,
    private readonly updateUserProvider: UpdateUserProvider,
    private readonly findOneUserByProvider: FindOneUserByProvider,
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,

    private readonly forgotMyPasswordProvider: ForgotMyPasswordProvider,
    private readonly resetMyPasswordProvider: ResetMyPasswordProvider,
    private readonly updateMeProvider: UpdateMeProvider,

    private readonly findOneUserWithBookingsProvider: FindOneUserWithBookingsProvider,
    private readonly findCurrentActiveUserProvider: FindCurrentActiveUserProvider,
    private readonly updateMyPasswordProvider: UpdateMyPasswordProvider,
  ) {}

  public async findAll() {
    return this.findAllUsersProvider.findAll();
  }

  public async create(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    return this.updateUserProvider.update(id, updateUserDto);
  }

  public async findById(id: string) {
    console.log('find user by id...');
    const user = await this.findOneUserByProvider.findOneUserBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      status: 'success',
      message: 'find user by id',
      data: user,
    };
  }

  public async deleteUser(id: string) {
    console.log('delete user...');
    try {
      const user = await this.usersRepository.delete(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return {
        status: 'success',
        message: 'delete user',
        deletedId: id,
      };
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException(
        (err as Error).message ||
          'Unable to delete user at the moment please try again.',
      );
    }
  }

  public async findOneUserBy(options: Partial<User>) {
    return this.findOneUserByProvider.findOneUserBy(options);
  }

  public async createGoogleUser(googleUser: IGoogleUser) {
    return this.createGoogleUserProvider.createGoogleUser(googleUser);
  }

  public async FindOneUserWithBookings(id: string) {
    return this.findOneUserWithBookingsProvider.findOneUserWithBooking(id);
  }

  public async findCurrentActiveUser(id: string) {
    return this.findCurrentActiveUserProvider.findCurrentActiveUser(id);
  }

  public forgotMyPassword(forgotPasswordDto: ForgotPasswordDto) {
    return this.forgotMyPasswordProvider.forgotMyPassword(forgotPasswordDto);
  }

  public resetMyPassword(
    resetToken: string,
    resetPasswordDto: ResetPasswordDto,
  ) {
    return this.resetMyPasswordProvider.resetMyPassword(
      resetToken,
      resetPasswordDto,
    );
  }

  public updateMe(id: string, updateUserDto: UpdateUserDto) {
    return this.updateMeProvider.updateMe(id, updateUserDto);
  }

  public updateMyPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    return this.updateMyPasswordProvider.updateMyPassword(
      id,
      updatePasswordDto,
    );
  }
}
