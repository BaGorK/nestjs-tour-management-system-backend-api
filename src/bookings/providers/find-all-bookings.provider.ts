import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllBookingsProvider {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  public async findAllBookings() {
    console.log('find all bookings...');

    try {
      const bookings = await this.bookingsRepository.find();

      return {
        status: 'success',
        message: 'find all bookings successfully',
        data: bookings,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find all bookings, please try again later.',
      );
    }
  }
}
