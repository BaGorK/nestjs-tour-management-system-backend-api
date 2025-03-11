import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { EmailOrPhone } from '../decorators/email-or-phone.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiPropertyOptional({
    description:
      'email of the user, password reset token will be sent to this email if it exists.',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description:
      'Phone Number of the user. password reset token will be sent as sms message to this phone number',
  })
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @EmailOrPhone({
    message: 'Either email or phone number is required.',
  })
  emailOrPhone: string;
}
