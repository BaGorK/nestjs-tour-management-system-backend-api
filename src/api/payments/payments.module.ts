import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './providers/payments.service';
import { BookingsModule } from 'src/api/bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/api/bookings/booking.entity';
import { InitializeBookingPaymentProvider } from './providers/initialize-booking-payment.provider';
import { VerifyBookingPaymentProvider } from './providers/verify-booking-payment.provider';
import { ToursModule } from '../tours/tours.module';
import { UsersModule } from 'src/api/users/users.module';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    InitializeBookingPaymentProvider,
    VerifyBookingPaymentProvider,
  ],
  imports: [
    BookingsModule,
    ToursModule,
    UsersModule,

    TypeOrmModule.forFeature([Booking]),
  ],
})
export class PaymentsModule {}
