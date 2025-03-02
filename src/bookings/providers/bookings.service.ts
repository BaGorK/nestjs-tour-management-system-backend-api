import { Injectable } from '@nestjs/common';
import { Booking } from '../booking.entity';
import { DeleteBookingProvider } from './delete-booking.provider';
import { FindBookingByIdProvider } from './find-booking-by-id.provider';
import { FindOneBookingByProvider } from './find-one-booking-by.provider';

@Injectable()
export class BookingsService {
  constructor(
    private readonly deleteBookingProvider: DeleteBookingProvider,
    private readonly findBookingByIdProvider: FindBookingByIdProvider,
    private readonly findOneBookingByProvider: FindOneBookingByProvider,
  ) {}
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
