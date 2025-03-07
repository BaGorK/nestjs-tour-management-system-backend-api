import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hash-password/hashing.provider';
import { CreateStaffDto } from 'src/staff/dtos/create-staff.dto';
import { Staff } from 'src/staff/staff.entity';
import { UsersService } from 'src/users/providers/users.service';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { FindOneStaffByProvider } from '../find-one-staff-by.provider';

@Injectable()
export class CreateStaffProvider {
  constructor(
    @InjectRepository(Staff)
    private readonly staffsRepository: Repository<Staff>,
    private readonly findOneStaffByProvider: FindOneStaffByProvider,

    private readonly hashingProvider: HashingProvider,

    private readonly usersService: UsersService,
  ) {}

  public async createStaff(createStaffDto: CreateStaffDto) {
    console.log('create staff provider...');

    let staff = await this.findOneStaffByProvider.findOneStaffBy({
      email: createStaffDto.email,
    });

    if (staff) {
      throw new BadRequestException(
        'Staff member with this email address already exists',
      );
    }

    try {
      staff = this.staffsRepository.create({
        ...createStaffDto,
        password: await this.hashingProvider.hashPassword(
          createStaffDto.password,
        ),
      });

      staff = await this.staffsRepository.save(staff);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to create a staff member, Please try again later',
      );
    }

    await this.checkIsUserAndDelete({ email: createStaffDto.email });

    return {
      status: 'success',
      message: 'staff created successfully',
      data: staff,
    };
  }

  private async checkIsUserAndDelete(options: Partial<User>) {
    const user = await this.usersService.findOneUserBy(options);

    if (user) {
      // TODO: INSTEAD OF DIRECTLY DELETING A USER FROM THE DATABASE
      // USE OTHER OPTIONS LIKE MAKE IS_ACTIVE=FALSE OR MOVE TO ANOTHER TABLE
      await this.usersService.deleteUser(user.id);
    }
  }
}
