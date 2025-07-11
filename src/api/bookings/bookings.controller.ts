import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Role } from 'src/api/auth/decorator/role.decorator';
import { Roles } from 'src/common/enum/Roles.enum';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { BookingsService } from './providers/bookings.service';

@Controller('bookings')
@Role(Roles.ADMIN)
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
  @ApiOperation({
    summary: 'Update Booking by id',
    description:
      'Update Bookin by id, Use this route to directly update a booking',
  })
  @ApiBody({
    type: UpdateBookingDto,
    required: true,
    description: 'update booking dto - the body that will be updated',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'booking id',
    example: '61afea9f-aec9-4536-9351-09ccec0a7b24',
  })
  @Patch(':id')
  public updateBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

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
