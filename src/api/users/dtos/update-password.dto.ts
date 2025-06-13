import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'your current/old password',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password length should at least 8 characters.' })
  oldPassword: string;

  @ApiProperty({
    description: 'your new password',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password length should at least 8 characters.' })
  newPassword: string;

  @ApiProperty({
    description: 'confirm your password.',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password length should at least 8 characters.' })
  passwordConfirm: string;
}
