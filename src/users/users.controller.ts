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
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './providers/users.service';

/**
 * Users Controller
 */
@Controller('/api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(
    /**
     * Injecting users service
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   * find all users
   */
  @ApiOperation({
    summary: 'Find all users',
    description: 'Find all users',
  })
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @Delete(':id')
  public deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
