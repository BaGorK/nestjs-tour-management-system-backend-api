import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';
import { CreateStaffProvider } from './providers/crud/create-staff.provider';
import { DeleteStaffProvider } from './providers/crud/delete-staff.provider';
import { FindAllStaffsProvider } from './providers/crud/find-all-staffs.provider';
import { FindStaffByIdProvider } from './providers/crud/find-staff-by-id.provider';
import { UpdateStaffProvider } from './providers/crud/update-staff.provider';
import { FindOneStaffByProvider } from './providers/find-one-staff-by.provider';
import { StaffService } from './providers/staff.service';
import { StaffController } from './staff.controller';
import { Staff } from './staff.entity';
import { UsersModule } from 'src/users/users.module';
import { ToursModule } from 'src/tours/tours.module';

@Module({
  controllers: [StaffController],
  providers: [
    StaffService,
    FindAllStaffsProvider,
    FindStaffByIdProvider,
    UpdateStaffProvider,
    CreateStaffProvider,
    DeleteStaffProvider,
    FindOneStaffByProvider,
  ],
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => ToursModule),
    UsersModule,
    FileUploadModule,
    TypeOrmModule.forFeature([Staff]),
  ],
  exports: [StaffService],
})
export class StaffModule {}
