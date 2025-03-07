import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneStaffByProvider {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  public async findOneStaffBy(options: Partial<Staff>) {
    console.log('find one staff by provider...');

    try {
      const staff = await this.staffRepository.findOneBy(options);

      return staff;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to fetch a staff, please try again later.',
      );
    }
  }
}
