import { Injectable } from '@nestjs/common';
import { InitializeBookingPaymentDto } from '../dtos/initialize-booking-pament.dto';
import { InitializeBookingPaymentProvider } from './initialize-booking-payment.provider';
import { VerifyBookingPaymentProvider } from './verify-booking-payment.provider';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly initializeBookingPaymentProvider: InitializeBookingPaymentProvider,
    private readonly verifyBookingPaymentProvider: VerifyBookingPaymentProvider,
  ) {}

  // initialize booking Payment
  public initializeBookingPayment(
    initializePaymentDto: InitializeBookingPaymentDto,
  ) {
    return this.initializeBookingPaymentProvider.initializeBookingPayment(
      initializePaymentDto,
    );
  }

  // verify booking payment
  public verifyBookingPayment(tx_ref: string) {
    return this.verifyBookingPaymentProvider.verifyBookingPayment(tx_ref);
  }
}
