import {
  BadRequestException,
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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/api/auth/decorator/active-user.decorator';
import { Auth } from 'src/api/auth/decorator/auth.decorator';
import { Role } from 'src/api/auth/decorator/role.decorator';
import { AuthType } from 'src/api/auth/enums/auth-type.enum';
import { ActiveUserData } from 'src/api/auth/interfaces/active-user-data.interface';
import { Roles } from 'src/common/enum/Roles.enum';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';
import { FileUploadDirNames } from 'src/lib/constants/file-upload-dir-names';
import { CreateUserDto } from './dtos/create-user.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './providers/users.service';
import { UpdatePasswordDto } from './dtos/update-password.dto';

/**
 * Users Controller
 */
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    /**
     * Injecting users service
     */
    private readonly usersService: UsersService,

    private readonly fileUploadService: FileUploadService,
  ) {}

  // forgot my password
  @ApiOperation({
    summary: 'Forgot My Password',
    description:
      'Forgot My Password. if the user forgotes his password use this endpoint to get a password reset url. either email or phoneNumber is required.',
  })
  @ApiBody({
    required: true,
    type: ForgotPasswordDto,
  })
  @Auth(AuthType.None)
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  public forgotMyPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.usersService.forgotMyPassword(forgotPasswordDto);
  }

  // reset my password
  @ApiOperation({
    summary: 'Reset My Password',
    description:
      'Reset My Password. Use this route to reset you password  incase you forgot it. you will recieve an email or sms message with the reset url.',
  })
  @ApiBody({
    type: ResetPasswordDto,
    required: true,
  })
  @ApiParam({
    name: 'resetToken',
    required: true,
    description: 'reset token you get from the email or sms reset url',
    example: '793b574f-9e87-4f85-a592-3d9f6ae0b541',
  })
  @Auth(AuthType.None)
  @Post('reset-password/:resetToken')
  @HttpCode(HttpStatus.OK)
  public resetMyPassword(
    @Param('resetToken') resetToken: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.usersService.resetMyPassword(resetToken, resetPasswordDto);
  }

  @ApiOperation({
    summary: 'Update Me',
    description:
      'Update Me, Use this route if a user want to update his data like name, email... etc.',
  })
  @ApiBody({
    type: UpdateUserDto,
    required: true,
  })
  @ApiBearerAuth()
  @Auth(AuthType.Bearer)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'profilePicture',
      FileUploadService.saveImageToStorage({
        dirName: FileUploadDirNames.user,
      }),
    ),
  )
  @Post('update-me')
  @HttpCode(HttpStatus.OK)
  public updateMe(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser('sub') id: string,
  ) {
    if (profilePicture) {
      updateUserDto.profilePicture =
        this.fileUploadService.getFilePath(profilePicture);
    }
    return this.usersService.update(id, updateUserDto);
  }

  // update my password
  @ApiOperation({
    summary: 'Update My Password',
    description:
      'Update My Password, use this route to update password by sending old, new and confrim password',
  })
  @ApiBody({
    type: UpdatePasswordDto,
    required: true,
  })
  @ApiBearerAuth()
  @Auth(AuthType.Bearer)
  @Post('update-my-password')
  @HttpCode(HttpStatus.OK)
  public updateMyPassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @ActiveUser('sub') id: string,
  ) {
    return this.usersService.updateMyPassword(id, updatePasswordDto);
  }

  /**
   * Find current active user
   */
  @ApiOperation({
    summary: 'Get Currently Logged In user | active user',
    description:
      'Get Currently logged in user, use this route to get the current active user',
  })
  @Get('current-user')
  public findCurrentActiveUser(@ActiveUser() activeUserData: ActiveUserData) {
    return this.usersService.findCurrentActiveUser(activeUserData.sub);
  }

  /**
   * find My Bookings
   * */
  @ApiOperation({
    summary: 'Find My Bookings',
    description:
      'Find My Bookings. users can use this route to find their booking history.',
  })
  @Get('my-bookings')
  public findMyBookings(@ActiveUser() activeUserData: ActiveUserData) {
    return this.usersService.FindOneUserWithBookings(activeUserData.sub);
  }

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
  @Role(Roles.ADMIN)
  @Get('my-bookings/:id')
  public findOneUserWithBooking(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.FindOneUserWithBookings(id);
  }

  /**
   * find all users
   */
  @ApiOperation({
    summary: 'Find all users',
    description: 'Find all users',
  })
  @Role(Roles.ADMIN)
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
  @Role(Roles.ADMIN)
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'profilePicture',
      FileUploadService.saveImageToStorage({
        dirName: FileUploadDirNames.user,
      }),
    ),
  )
  @Role(Roles.ADMIN)
  @Post()
  public createUser(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (!profilePicture) {
      throw new BadRequestException('Profile picture is required.');
    }
    createUserDto.profilePicture =
      this.fileUploadService.getFilePath(profilePicture);

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
  @Role(Roles.ADMIN)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor(
      'profilePicture',
      FileUploadService.saveImageToStorage({
        dirName: FileUploadDirNames.user,
      }),
    ),
  )
  public updateUser(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (profilePicture) {
      updateUserDto.profilePicture =
        this.fileUploadService.getFilePath(profilePicture);
    }
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
  @Role(Roles.ADMIN)
  @Delete(':id')
  public deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
