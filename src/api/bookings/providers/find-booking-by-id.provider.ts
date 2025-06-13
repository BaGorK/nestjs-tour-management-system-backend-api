import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';

@Injectable()
export class FindBookingByIdProvider {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
  ) {}

  public async findBookingById(id: string) {
    console.log('find booking by id ...');
    let booking = undefined;

    try {
      booking = await this.bookingsRepository.findOneBy({ id });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Unable to find booking by id');
    }

    if (!booking) {
      throw new NotFoundException(`Booking with booking ID: ${id} not found.`);
    }

    return {
      status: 'success',
      message: 'find booking by id successfull',
      data: booking,
    };
  }
}
