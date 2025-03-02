import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';

@Injectable()
export class DeleteBookingProvider {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  public async deleteBooking(id: string) {
    console.log('delete booking...');

    let booking = undefined;

    try {
      booking = await this.bookingsRepository.findOneBy({ id });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find booking, please try agian later.',
      );
    }

    if (!booking) {
      throw new NotFoundException(`Booking with booking ID: ${id} not found.`);
    }

    try {
      await this.bookingsRepository.delete(id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to delete booking, please try agian later.',
      );
    }

    return {
      status: 'success',
      messssage: 'booking deleted successfully',
    };
  }
}
