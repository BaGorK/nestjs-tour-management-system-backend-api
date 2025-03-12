import { Injectable } from '@nestjs/common';
import { ResetPasswordDto } from 'src/users/dtos/reset-password.dto';

@Injectable()
export class ResetMyPasswordProvider {
  public async resetMyPassword(
    resetToken: string,
    resetPasswordDto: ResetPasswordDto,
  ) {
    return {
      resetToken,
      resetPasswordDto,
    };
  }
}
