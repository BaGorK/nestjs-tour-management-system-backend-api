import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Tour } from '../entities/tour.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindTourWithBookingsProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,
  ) {}
  public async findTourWithBookings(id: string) {
    console.log('find tour with booking details...');

    let tour: Tour | undefined;
    try {
      tour = await this.toursRepository.findOne({
        where: { id },
        relations: {
          bookings: true,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to fetch tour by id, please try again later.',
      );
    }

    if (!tour) {
      throw new NotFoundException(`Tour by tour ID: ${id} not found.`);
    }

    return {
      status: 'success',
      message: 'find tour with tour detaile successfull',
      data: tour,
    };
  }
}
