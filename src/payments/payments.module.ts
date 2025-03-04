import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './providers/payments.service';
import { BookingsModule } from 'src/bookings/bookings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/booking.entity';
import { InitializeBookingPaymentProvider } from './providers/initialize-booking-payment.provider';
import { VerifyBookingPaymentProvider } from './providers/verify-booking-payment.provider';
import { ToursModule } from 'src/tours/tours.module';
import { UsersModule } from 'src/users/users.module';

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
