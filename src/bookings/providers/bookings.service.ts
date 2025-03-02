import { Injectable } from '@nestjs/common';
import { DeleteBookingProvider } from './delete-booking.provider';
import { FindBookingByIdProvider } from './find-booking-by-id.provider';

@Injectable()
export class BookingsService {
  constructor(
    private readonly deleteBookingProvider: DeleteBookingProvider,
    private readonly findBookingByIdProvider: FindBookingByIdProvider,
  ) {}
  // find booking by id
  public findBookingById(id: string) {
    return this.findBookingByIdProvider.findBookingById(id);
  }

  // delete tour
  public deleteBooking(id: string) {
    return this.deleteBookingProvider.deleteBooking(id);
  }
}
