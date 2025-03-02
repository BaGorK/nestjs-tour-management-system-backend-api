import { Injectable } from '@nestjs/common';
import { DeleteBookingProvider } from './delete-booking.provider';

@Injectable()
export class BookingsService {
  constructor(private readonly deleteBookingProvider: DeleteBookingProvider) {}

  // delete tour
  public deleteTour(id: string) {
    return this.deleteBookingProvider.deleteBooking(id);
  }
}
