import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity';
import { Repository } from 'typeorm';
import { FindOneStaffByProvider } from '../find-one-staff-by.provider';

@Injectable()
export class FindStaffByIdProvider {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,

    private readonly findOneStaffByProvider: FindOneStaffByProvider,
  ) {}

  public async findStaffById(id: string) {
    console.log('find staff by id provider...');

    const staff = await this.findOneStaffByProvider.findOneStaffBy({ id });

    if (!staff) {
      throw new NotFoundException(`Staff with ID=${id} not found.`);
    }

    return {
      status: 'success',
      message: 'find staff by id successfull',
      data: staff,
    };
  }
}
