import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { Staff } from '../staff.entity';
import { CreateStaffProvider } from './crud/create-staff.provider';
import { FindOneStaffByProvider } from './find-one-staff-by.provider';
import { DeleteStaffProvider } from './crud/delete-staff.provider';

@Injectable()
export class StaffService {
  constructor(
    private readonly createStaffProvider: CreateStaffProvider,
    private readonly findOneStaffByProvider: FindOneStaffByProvider,
    private readonly deleteStaffProvider: DeleteStaffProvider,
  ) {}

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
