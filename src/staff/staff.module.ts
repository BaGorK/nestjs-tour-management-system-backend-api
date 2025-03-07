import { Module } from '@nestjs/common';
import { CreateStaffProvider } from './providers/crud/create-staff.provider';
import { FindAllStaffsProvider } from './providers/crud/find-all-staffs.provider';
import { FindStaffByIdProvider } from './providers/crud/find-staff-by-id.provider';
import { UpdateStaffProvider } from './providers/crud/update-staff.provider';
import { StaffService } from './providers/staff.service';
import { StaffController } from './staff.controller';
import { DeleteStaffProvider } from './providers/crud/delete-staff.provider';

@Module({
  controllers: [StaffController],
  providers: [
    StaffService,
    FindAllStaffsProvider,
    FindStaffByIdProvider,
    UpdateStaffProvider,
    CreateStaffProvider,
    DeleteStaffProvider,
  ],
})
export class StaffModule {}
