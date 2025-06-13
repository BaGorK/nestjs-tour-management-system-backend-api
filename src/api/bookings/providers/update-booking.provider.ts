import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToursService } from 'src/api/tours/providers/tours.service';
import { UsersService } from 'src/api/users/providers/users.service';
import { Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { UpdateBookingDto } from '../dtos/update-booking.dto';
import { FindOneBookingByProvider } from './find-one-booking-by.provider';
import { User } from 'src/api/users/user.entity';
import { Tour } from 'src/api/tours/entities/tour.entity';

@Injectable()
export class UpdateBookingProvider {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    private readonly usersService: UsersService,
    private readonly toursService: ToursService,
    private readonly findOneBookingByProvider: FindOneBookingByProvider,
  ) {}

  public async updateBooking(id: string, updateBookingDto: UpdateBookingDto) {
    console.log('update booking...');

    let booking: Booking | undefined;
    let user: User | undefined;
    let tour: Tour | undefined;

    booking = await this.findOneBookingByProvider.findOneBookingBy({ id });

    if (!booking) {
      throw new NotFoundException(`Booking by booking ID: ${id} not found`);
    }

    if (updateBookingDto.user) {
      user = await this.usersService.findOneUserBy({
        id: updateBookingDto.user,
      });

      if (!user) {
        throw new NotFoundException(
          `User by user ID: ${updateBookingDto.user} not found`,
        );
      }
    }

    if (updateBookingDto.tour) {
      tour = await this.toursService.findOneTourBy({
        id: updateBookingDto.tour,
      });

      if (!tour) {
        throw new NotFoundException(
          `Tour by tour ID: ${updateBookingDto.tour} not found`,
        );
      }
    }

    // update booking
    booking.user = updateBookingDto.user ? user : booking.user;
    booking.tour = updateBookingDto.tour ? tour : booking.tour;
    booking.isPaid = updateBookingDto.isPaid ?? booking.isPaid;
    booking.price = updateBookingDto.price ?? booking.price;

    try {
      booking = await this.bookingsRepository.save(booking);

      return {
        status: 'success',
        message: 'booking updated successfully',
        data: booking,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to update booking, please try again later',
      );
    }
  }
}
