import { Injectable } from '@nestjs/common';
import { Booking } from '../booking.entity';
import { DeleteBookingProvider } from './delete-booking.provider';
import { FindBookingByIdProvider } from './find-booking-by-id.provider';
import { FindOneBookingByProvider } from './find-one-booking-by.provider';
import { FindAllBookingsProvider } from './find-all-bookings.provider';

@Injectable()
export class BookingsService {
  constructor(
    private readonly findAllBoookingsProvider: FindAllBookingsProvider,
    private readonly deleteBookingProvider: DeleteBookingProvider,
    private readonly findBookingByIdProvider: FindBookingByIdProvider,
    private readonly findOneBookingByProvider: FindOneBookingByProvider,
  ) {}
  // find all bookings
  public async findAllBookings() {
    return this.findAllBoookingsProvider.findAllBookings();
  }

  // find booking by id
  public findBookingById(id: string) {
    return this.findBookingByIdProvider.findBookingById(id);
  }

  // delete tour
  public deleteBooking(id: string) {
    return this.deleteBookingProvider.deleteBooking(id);
  }

  // find booking by
  public findOneBookingBy(options: Partial<Booking>) {
    return this.findOneBookingByProvider.findOneBookingBy(options);
  }
}
