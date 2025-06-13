import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/api/staff/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindStaffByIdProvider {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  public async findStaffById(id: string) {
    console.log('find staff by id provider...');

    let staff: Staff | undefined;

    try {
      staff = await this.staffRepository.findOne({
        where: { id },
        relations: {
          tours: true,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find staff by id, please try again later.',
      );
    }

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
