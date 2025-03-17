import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CheckPasswordConfirm } from '../decorators/check-pass-confirm.decorator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'your new password',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password length should at least 8 characters.' })
  newPassword: string;

  @ApiProperty({
    description: 'Confirm you new password',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'password length should at least 8 characters.' })
  passwordConfirm: string;

  @CheckPasswordConfirm()
  checkPasswordConfirm: string;
}
