import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../booking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneBookingByProvider {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  public async findOneBookingBy(options: Partial<Booking>) {
    console.log('find one booking by...');

    let booking = undefined;

    try {
      booking = await this.bookingsRepository.findOneBy(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find booking by condition',
      );
    }

    return booking;
  }
}
