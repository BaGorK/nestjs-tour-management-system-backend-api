import { Controller, Delete, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { BookingsService } from './providers/bookings.service';
import { Role } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}
  // find all bookings
  @ApiOperation({
    summary: 'Get All Bookings',
    description: 'Get All Bookings.',
  })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @Get()
  public findAllBookings() {
    return this.bookingService.findAllBookings();
  }

  // create booking
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @Delete(':id')
  public deleteBooking(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingService.deleteBooking(id);
  }
}
