import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStaffDto } from 'src/staff/dtos/update-staff.dto';
import { Staff } from 'src/staff/staff.entity';
import { Repository } from 'typeorm';
import { FindOneStaffByProvider } from '../find-one-staff-by.provider';

@Injectable()
export class UpdateStaffProvider {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,

    private readonly findOneStaffByProvider: FindOneStaffByProvider,
  ) {}

  public async updateStaff(id: string, updateStaffDto: UpdateStaffDto) {
    console.log('update staff provider...');

    let staff = await this.findOneStaffByProvider.findOneStaffBy({ id });

    if (!staff) {
      throw new BadRequestException(`Staff member with ID:${id} not found.`);
    }

    staff.role = updateStaffDto.role ?? staff.role;
    staff.firstName = updateStaffDto.firstName ?? staff.firstName;
    staff.lastName = updateStaffDto.lastName ?? staff.lastName;
    staff.profilePicture =
      updateStaffDto.profilePicture ?? staff.profilePicture;

    try {
      staff = await this.staffRepository.save(staff);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to Update staff member, please try again later.',
      );
    }

    return {
      status: 'success',
      message: 'staff updated successfully',
      data: staff,
    };
  }
}
