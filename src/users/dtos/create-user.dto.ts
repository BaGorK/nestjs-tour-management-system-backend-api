import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  lastName: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(96)
  email: string;

  @ApiProperty({
    description: 'Phone Number of the user',
    example: '+251908005801',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  password: string;

  @ApiProperty({
    description: 'The password confirmation of the user',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @ValidateIf(o => o.password !== o.passwordConfirm, {
    message: 'password and password confirm do not match',
  })
  passwordConfirm: string;
}
