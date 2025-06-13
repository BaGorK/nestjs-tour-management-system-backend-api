import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ChapaService } from 'chapa-nestjs';
import { Booking } from 'src/api/bookings/booking.entity';
import { ToursService } from 'src/api/tours/providers/tours.service';
import { UsersService } from 'src/api/users/providers/users.service';
import { Repository } from 'typeorm';
import { InitializeBookingPaymentDto } from '../dtos/initialize-booking-pament.dto';

@Injectable()
export class InitializeBookingPaymentProvider {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,

    private readonly configService: ConfigService,

    private readonly toursService: ToursService,
    private readonly usersService: UsersService,

    private readonly chapaService: ChapaService,
  ) {}

  // initialize booking Payment
  public async initializeBookingPayment(
    initializePaymentDto: InitializeBookingPaymentDto,
  ) {
    console.log('initialize booking payment...');

    // first check if the tour exists, and also the user if its id send as a dto
    const tour = await this.toursService.findOneTourBy({
      id: initializePaymentDto.tour,
    });
    if (!tour) {
      throw new NotFoundException(
        `Tour with tour ID: ${initializePaymentDto.tour} not found when initializing booking payment`,
      );
    }

    const user = await this.usersService.findOneUserBy({
      id: initializePaymentDto.user,
    });
    if (!user) {
      throw new NotFoundException(
        `User with user ID: ${initializePaymentDto.tour} not found when initializing booking payment`,
      );
    }

    // we create a text reference for the ChapaService
    let txRef: string | undefined;
    try {
      txRef = await this.chapaService.generateTransactionReference();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Error occured when generating a transaction reference',
      );
    }

    // then create a booking with a payment status of pending
    const amount = tour.priceDiscount
      ? tour.price - tour.priceDiscount
      : tour.price;

    const booking = this.bookingsRepository.create({
      tour,
      user,
      price: amount,
      txRef,
    });

    try {
      const newBooking = await this.bookingsRepository.save(booking);
      console.log('newBooking', newBooking);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Error occured when saving a booking',
      );
    }

    // then we initialize payment
    const callback_url = this.configService.get<string>(
      'appConfig.chapaWebhookUrl',
    );
    console.log('callback_url: ', callback_url);

    try {
      const response = await this.chapaService.initialize({
        first_name: user.firstName,
        last_name: user.lastName,
        currency: 'ETB',
        email: user.email,
        amount: String(amount),
        tx_ref: txRef,
        callback_url,
      });

      console.log(response);
      // and return the checkout URL back
      return response;
    } catch (err) {
      console.log(err);
      throw new BadGatewayException(
        'Error occured when initializing the payment.',
      );
    }
  }
}
