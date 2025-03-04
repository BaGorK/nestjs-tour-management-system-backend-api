import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { Role } from 'src/auth/decorator/role.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRole } from './enums/user-role.enum';
import { UsersService } from './providers/users.service';

/**
 * Users Controller
 */
@Controller('users')
@ApiBearerAuth()
@Role(UserRole.ADMIN)
export class UsersController {
  constructor(
    /**
     * Injecting users service
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   * find one user with booking history detail
   */
  @ApiOperation({
    summary: 'Find One User with Booking history',
    description:
      'Find One User with Booking history. use this route to find all bookings that a user make',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of a user',
    example: '9fe4996c-b2e9-4829-aa67-400ec1d35d56',
  })
  @Get('with-bookings/:id')
  public findOneUserWithBooking(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.FindOneUserWithBookings(id);
  }

  /**
   * find My Bookings
   * */
  @ApiOperation({
    summary: 'Find My Bookings',
    description:
      'Find My Bookings. users can use this route to find their booking history.',
  })
  @Role(UserRole.USER, UserRole.GUIDE, UserRole.LEAD_GUIDE)
  @Get('my-bookings')
  public findMyBookings(@ActiveUser() activeUserData: ActiveUserData) {
    return this.usersService.FindOneUserWithBookings(activeUserData.sub);
  }

  /**
   * find all users
   */
  @ApiOperation({
    summary: 'Find all users',
    description: 'Find all users',
  })
  @Get()
  public findAllUsers() {
    return this.usersService.findAll();
  }

  /**
   * find user by id
   */
  @ApiOperation({
    summary: 'Find user by id',
    description: 'Find user by id',
  })
  @ApiParam({
    name: 'id',
    description: 'user id',
    required: true,
  })
  @Get(':id')
  public findUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findById(id);
  }

  /**
   * create user
   */
  @ApiOperation({
    summary: 'Create user',
    description: 'Create user',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'create user dto',
  })
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * update user
   */
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user',
  })
  @ApiParam({
    name: 'id',
    description: 'user id',
    required: true,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'update user dto',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * delete user
   */
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user',
  })
  @ApiParam({
    name: 'id',
    description: 'user id',
    required: true,
  })
  @Delete(':id')
  public deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
