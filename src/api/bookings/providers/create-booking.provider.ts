import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from '../dtos/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../booking.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/api/users/providers/users.service';
import { ToursService } from 'src/api/tours/providers/tours.service';

@Injectable()
export class CreateBookingProvider {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    private readonly usersService: UsersService,
    private readonly toursService: ToursService,
  ) {}

  public async createBooking(createBookingDto: CreateBookingDto) {
    console.log('create booking...');

    const user = await this.usersService.findOneUserBy({
      id: createBookingDto.user,
    });

    if (!user) {
      throw new NotFoundException(
        `User with user ID: ${createBookingDto.user} not found.`,
      );
    }

    const tour = await this.toursService.findOneTourBy({
      id: createBookingDto.tour,
    });

    if (!tour) {
      throw new NotFoundException(
        `Tour with tour ID: ${createBookingDto.tour} not found.`,
      );
    }

    let booking = this.bookingsRepository.create({
      ...createBookingDto,
      user,
      tour,
    });

    try {
      booking = await this.bookingsRepository.save(booking);

      return {
        status: 'success',
        message: 'Booking created successfully',
        data: booking,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to create a booking, please try again later',
      );
    }
  }
}
