import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import * as crypto from 'crypto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Roles } from 'src/common/enum/Roles.enum';
import { InitializeBookingPaymentDto } from './dtos/initialize-booking-pament.dto';
import { VerifyBookingPaymentDto } from './dtos/verify-booking-payment.dto';
import { PaymentsService } from './providers/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly configService: ConfigService,
  ) {}

  // initialize payment
  @ApiOperation({
    summary: 'Initialize Payment for booking a tour',
    description: 'Initialize Payment for booking a tour',
  })
  @ApiBody({
    type: InitializeBookingPaymentDto,
    required: true,
  })
  @ApiBearerAuth()
  @Post('initialize')
  public initializeBookingPayment(
    @Body() initializePaymentDto: InitializeBookingPaymentDto,
    @ActiveUser() activeUserData: ActiveUserData,
  ) {
    if (
      activeUserData.role === Roles.USER &&
      initializePaymentDto.user &&
      initializePaymentDto.user !== activeUserData.sub
    ) {
      throw new BadRequestException(
        'Users can initialize booking payments for them selfs only, the can not use other users id',
      );
    } else {
      initializePaymentDto.user =
        initializePaymentDto.user ?? activeUserData.sub;
    }
    return this.paymentsService.initializeBookingPayment(initializePaymentDto);
  }

  // web hook URL for verifying
  @ApiOperation({
    summary: 'Chapa Webhook url',
    description:
      'Chapa webhook url, this route is called by chapa when their is an event. it helps us to verify the payment.',
  })
  @ApiBody({
    type: VerifyBookingPaymentDto,
    required: true,
  })
  @Auth(AuthType.None)
  @Get('chapa-webhook/verify')
  public verifyBookingPayment(
    @Body() verifyBookingPaymentDto: VerifyBookingPaymentDto,
    @Headers('x-chapa-signature') chapaSignature: string,
  ) {
    const hash = crypto
      .createHmac(
        'sha256',
        this.configService.get('appConfig.chapaWebhookSecret'),
      )
      .update(JSON.stringify(verifyBookingPaymentDto))
      .digest('hex');

    if (hash !== chapaSignature) {
      console.error(`Invalid chapa signature: ${hash}`);
      throw new BadRequestException('Invalid Chapa Signature');
    }

    return this.paymentsService.verifyBookingPayment(
      verifyBookingPaymentDto.tx_ref,
    );
  }
}
