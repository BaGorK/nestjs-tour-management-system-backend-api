import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapaService } from 'chapa-nestjs';
import { Booking } from 'src/bookings/booking.entity';
import { BookingsService } from 'src/bookings/providers/bookings.service';
import { Repository } from 'typeorm';
import { PaymentStatusEnum } from '../enums/payment-status.enum';

@Injectable()
export class VerifyBookingPaymentProvider {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    private readonly bookingService: BookingsService,

    private readonly chapaService: ChapaService,
  ) {}

  // verify booking payment
  public async verifyBookingPayment(tx_ref: string) {
    console.log('verifying booking payment...');

    const response = await this.chapaService.verify({ tx_ref });

    if (response.status !== 'success') {
      throw new BadRequestException(
        'Invalid transaction or Transaction not found	',
      );
    }

    let booking = await this.bookingService.findOneBookingBy({ txRef: tx_ref });

    if (!booking) {
      throw new NotFoundException(
        'Booking not found when verifying Booking payment',
      );
    }

    if (booking.paymentStatus !== PaymentStatusEnum.PENDING) {
      return 'booking payment is verified before';
    }

    // update booking and save it.
    booking.paymentStatus = PaymentStatusEnum.VERIFIED;
    booking.isPaid = true;

    try {
      booking = await this.bookingRepository.save(booking);

      return {
        status: 'success',
        message: 'payment verified and updated successfully',
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to update boooking payment status on verify, please try again later',
      );
    }
  }
}
