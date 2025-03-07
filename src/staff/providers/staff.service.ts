import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { Staff } from '../staff.entity';
import { CreateStaffProvider } from './crud/create-staff.provider';
import { FindOneStaffByProvider } from './find-one-staff-by.provider';

@Injectable()
export class StaffService {
  constructor(
    private readonly createStaffProvider: CreateStaffProvider,
    private readonly findOneStaffByProvider: FindOneStaffByProvider,
  ) {}

  // create Staff
  public createStaff(createStaffDto: CreateStaffDto) {
    return this.createStaffProvider.createStaff(createStaffDto);
  }

  // find one staff by
  public findOneStaffBy(options: Partial<Staff>) {
    return this.findOneStaffByProvider.findOneStaffBy(options);
  }
}
