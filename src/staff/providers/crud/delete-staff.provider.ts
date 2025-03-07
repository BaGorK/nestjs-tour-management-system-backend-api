import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/staff.entity';
import { Repository } from 'typeorm';
import { FindOneStaffByProvider } from '../find-one-staff-by.provider';

@Injectable()
export class DeleteStaffProvider {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,

    private readonly findOneStaffByProvider: FindOneStaffByProvider,
  ) {}

  public async deleteStaff(id: string) {
    console.log('delete staff provider...');

    const staff = await this.findOneStaffByProvider.findOneStaffBy({ id });

    if (!staff) {
      throw new BadRequestException(`Staff with ID=${id} not found`);
    }

    try {
      await this.staffRepository.delete(id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to delete staff member, please try again later',
      );
    }

    return {
      status: 'success',
      message: `staff with ID=${id} deleted successfully`,
    };
  }
}
