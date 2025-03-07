import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { Staff } from '../staff.entity';
import { CreateStaffProvider } from './crud/create-staff.provider';
import { FindOneStaffByProvider } from './find-one-staff-by.provider';
import { DeleteStaffProvider } from './crud/delete-staff.provider';
import { FindAllStaffsProvider } from './crud/find-all-staffs.provider';

@Injectable()
export class StaffService {
  constructor(
    private readonly createStaffProvider: CreateStaffProvider,
    private readonly findOneStaffByProvider: FindOneStaffByProvider,
    private readonly deleteStaffProvider: DeleteStaffProvider,
    private readonly findAllStaffsProvider: FindAllStaffsProvider,
  ) {}

  // find all staff members
  public findAllStaff() {
    return this.findAllStaffsProvider.findAllStaff();
  }

  // create Staff
  public createStaff(createStaffDto: CreateStaffDto) {
    return this.createStaffProvider.createStaff(createStaffDto);
  }

  // delete staff
  public deleteStaff(id: string) {
    return this.deleteStaffProvider.deleteStaff(id);
  }

  // find one staff by
  public findOneStaffBy(options: Partial<Staff>) {
    return this.findOneStaffByProvider.findOneStaffBy(options);
  }
}
