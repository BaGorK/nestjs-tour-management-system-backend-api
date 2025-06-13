import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursModule } from '../tours/tours.module';
import { UsersModule } from 'src/api/users/users.module';
import { Booking } from './booking.entity';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './providers/bookings.service';
import { CreateBookingProvider } from './providers/create-booking.provider';
import { DeleteBookingProvider } from './providers/delete-booking.provider';
import { FindAllBookingsProvider } from './providers/find-all-bookings.provider';
import { FindBookingByIdProvider } from './providers/find-booking-by-id.provider';
import { FindOneBookingByProvider } from './providers/find-one-booking-by.provider';
import { UpdateBookingProvider } from './providers/update-booking.provider';

@Module({
  controllers: [BookingsController],
  providers: [
    BookingsService,
    CreateBookingProvider,
    UpdateBookingProvider,
    FindAllBookingsProvider,
    FindBookingByIdProvider,
    FindOneBookingByProvider,
    DeleteBookingProvider,
  ],
  imports: [TypeOrmModule.forFeature([Booking]), UsersModule, ToursModule],
  exports: [BookingsService],
})
export class BookingsModule {}
