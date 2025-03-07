import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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
import { Role } from 'src/auth/decorator/role.decorator';
import { Roles } from 'src/common/enum/Roles.enum';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';
import { FileUploadDirNames } from 'src/lib/constants/file-upload-dir-names';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { StaffService } from './providers/staff.service';

@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  // find all staff members
  @ApiOperation({
    summary: 'Find All Staff Members',
    description: 'Find All Staff Members',
  })
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @Get()
  public findAllStaff() {
    return this.staffService.findAllStaff();
  }

  // create staff
  @ApiOperation({
    summary: 'Create Staff Member',
    description: 'Create Staff Member',
  })
  @ApiBody({
    type: CreateStaffDto,
    required: true,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseInterceptors(
    FileInterceptor(
      'profilePicture',
      FileUploadService.saveImageToStorage({
        dirName: FileUploadDirNames.staff,
      }),
    ),
  )
  @Post()
  public createStaff(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body() createStaffDto: CreateStaffDto,
  ) {
    if (!profilePicture) {
      throw new BadRequestException('Profile picture is required');
    }

    createStaffDto.profilePicture =
      this.fileUploadService.getFilePath(profilePicture);

    return this.staffService.createStaff(createStaffDto);
  }

  // find staff by id
  @ApiOperation({
    summary: 'Find Staff by ID',
    description: 'Find Staff by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of Staff Member',
    example: '56a2f6d8-7b21-44f7-a7c9-a620baa7ef44',
  })
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @Get(':id')
  public findStaffById(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffService.findStaffById(id);
  }

  // update staff by id
  @ApiOperation({
    summary: 'Update Staff by ID',
    description: 'Update Staff by ID',
  })
  @ApiBody({
    type: UpdateStaffDto,
    required: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: '120932b9-e741-4560-a2d0-b60212a853d9',
  })
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor(
      'profilePicture',
      FileUploadService.saveImageToStorage({
        dirName: FileUploadDirNames.staff,
      }),
    ),
  )
  @Role(Roles.ADMIN)
  @Patch(':id')
  public updateStaff(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    if (profilePicture) {
      updateStaffDto.profilePicture =
        this.fileUploadService.getFilePath(profilePicture);
    }
    return this.staffService.updateStaff(id, updateStaffDto);
  }

  // Delete Staff By ID
  @ApiOperation({
    summary: 'Delete Staff by ID',
    description: 'Delete Staff memeber by ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Staff memeber ID',
    example: '0a47be1c-7035-42cd-8376-f5654d0622db',
  })
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @Delete(':id')
  public deleteStaff(@Param('id', ParseUUIDPipe) id: string) {
    return this.staffService.deleteStaff(id);
  }
}
