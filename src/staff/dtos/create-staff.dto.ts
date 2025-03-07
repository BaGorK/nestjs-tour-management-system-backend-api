import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StaffRole } from '../enum/staff-role.enum';

export class CreateStaffDto {
  @ApiProperty({
    description: 'First name of the staff member',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last Name of the staff member',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Last Name of the staff member',
    example: 'john@doe.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Last Name of the staff member',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password should be at least 8 Characters' })
  @MaxLength(96)
  password?: string;

  @ApiProperty({
    description: 'profile images of the member',
    type: 'string',
    format: 'binary',
    required: true,
  })
  profilePicture: string;

  @ApiProperty({
    description: 'role of the staff member',
    enum: StaffRole,
    example: StaffRole.GUIDE,
  })
  @IsNotEmpty()
  @IsEnum(StaffRole)
  role: StaffRole;
}
