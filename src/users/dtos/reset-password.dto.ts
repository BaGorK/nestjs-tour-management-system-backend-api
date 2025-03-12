import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CheckPasswordConfirm } from '../decorators/check-pass-confirm.decorator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'your new password',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @ApiProperty({
    description: 'Confirm you new password',
    example: 'test1234',
  })
  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;

  @CheckPasswordConfirm()
  checkPasswordConfirm: string;
}
