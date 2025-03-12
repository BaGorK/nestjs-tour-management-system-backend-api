import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'your current/old password',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'your new password',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @ApiProperty({
    description: 'confirm your password.',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}
