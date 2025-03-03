import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { BookingsService } from './providers/bookings.service';
import { Role } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Controller('bookings')
@Role(UserRole.ADMIN)
@ApiBearerAuth()
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}
  // find all bookings
  @ApiOperation({
    summary: 'Get All Bookings',
    description: 'Get All Bookings.',
  })
  @Get()
  public findAllBookings() {
    return this.bookingService.findAllBookings();
  }

  // create booking
  @ApiOperation({
    summary: 'Create a Booking',
    description:
      'Create a Booking. Use this route to directly create a booking by passing the user id and tour id.',
  })
  @ApiBody({
    type: CreateBookingDto,
    required: true,
  })
  @Post()
  public createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  // find booking by id
  @ApiOperation({
    summary: 'Find Booking by id',
    description: 'Find Booking by id, use route to fetch a booking by id.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'booking id',
    example: '1809ee79-91bc-4cc9-8c1c-4cae403c65e4',
  })
  @Get(':id')
  public findBookingById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingService.findBookingById(id);
  }
  // update booking
  // delete booking
  @ApiOperation({
    summary: 'Delete Booking by id',
    description:
      'Delete Booking by id, use this route to delete a booking by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'booking id',
    example: '1809ee79-91bc-4cc9-8c1c-4cae403c65e4',
  })
  @Delete(':id')
  public deleteBooking(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingService.deleteBooking(id);
  }
}
