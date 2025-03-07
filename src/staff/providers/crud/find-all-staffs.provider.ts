import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllStaffsProvider {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  public async findAllStaff() {
    console.log('find all staff members...');

    try {
      const staff = await this.staffRepository.find();

      return {
        status: 'success',
        message: 'find all staff memebers successfull',
        data: staff,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find all staff members, please try again later',
      );
    }
  }
}
