import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/common/email/email.service';
import { TwilioService } from 'src/common/twilio/twilio.service';
import { CreateCryptoHash } from 'src/lib/helpers/create-crypto-hash.helper';
import { CreateCryptoToken } from 'src/lib/helpers/create-crypto-token.helper';
import { GetResetPassEmailHtmlTemplate } from 'src/lib/helpers/get-reset-password-email-template.helper';
import { ForgotPasswordDto } from 'src/api/users/dtos/forgot-password.dto';
import { User } from 'src/api/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForgotMyPasswordProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersReposiory: Repository<User>,

    private readonly configService: ConfigService,

    private readonly emailService: EmailService,
    private readonly twilioService: TwilioService,
  ) {}

  public async forgotMyPassword(forgotPasswordDto: ForgotPasswordDto) {
    console.log('forgot password ....');

    const { email, phoneNumber } = forgotPasswordDto;

    let user: User | undefined;

    try {
      user = await this.usersReposiory.findOne({
        where: [
          email ? { email } : undefined,
          phoneNumber ? { phoneNumber } : undefined,
        ],
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find a user, please try again later',
      );
    }

    if (!user) {
      throw new BadRequestException(
        'User Not found, please check your email or phone number.',
      );
    }

    const resetToken = CreateCryptoToken();
    const resetTokenHash = CreateCryptoHash(resetToken);
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordTokenExpiresAt = resetTokenExpires;

    try {
      user = await this.usersReposiory.save(user);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'unable to save password reset token. please try again later.',
      );
    }

    const appName = this.configService.get('appConfig.appName');
    const resetUrl = `${this.configService.get('appConfig.resetPasswordFrontendUrl')}/${resetToken}`;

    if (email) {
      const message = `
          Dear ${user.firstName} ${user.lastName},
          We received a request to reset your password for your account at ${appName}.
          To reset your password, please use the link below. This link will expire in 10 minutes for your security: ${resetUrl}
          If you did not request a password reset, please disregard this email. Your account is safe, and no action is needed.
          For any questions or assistance, feel free to reach out to our support team. We're here to help!
          Hotelify Team`;
      const html = GetResetPassEmailHtmlTemplate({
        appName,
        resetUrl,
        user,
      });

      try {
        await this.emailService.sendEmail({
          html,
          message,
          recipient_email: user.email,
          subject: 'Your password reset token (valid for 10 min)',
        });
      } catch (err) {
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiresAt = null;

        try {
          await this.usersReposiory.save(user);
        } catch (resetError) {
          console.log(resetError);
        }

        console.log(err);
        throw new InternalServerErrorException(
          `Unable to send email: ${(err as Error).message}, Please try again later`,
        );
      }
    } else if (phoneNumber) {
      try {
        await this.twilioService.sendSMS({
          recieptPhoneNumber: user.phoneNumber,
          message: `Click the link to reset your password ${resetUrl}`,
        });
      } catch (err) {
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiresAt = null;

        try {
          await this.usersReposiory.save(user);
        } catch (resetError) {
          console.log(resetError);
        }

        console.log('error sending a message, ', err);
        throw new InternalServerErrorException(
          `Unable to send sms message: ${(err as Error).message}, Please try again later.`,
        );
      }
    } else {
      throw new BadRequestException('Could not send reset url');
    }

    return {
      status: 'success',
      message: 'password reset url sent successfully',
      data: {},
    };
  }
}
