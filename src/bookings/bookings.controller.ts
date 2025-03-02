import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { BookingsService } from './providers/bookings.service';
import { Role } from 'src/auth/decorator/role.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  // delete booking
  @ApiOperation({
    summary: 'Delete Booking by id',
    description:
      'Delete Booking by id, use this route to delete a booking by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    example: '1809ee79-91bc-4cc9-8c1c-4cae403c65e4',
  })
  @ApiBearerAuth()
  @Role(UserRole.ADMIN)
  @Delete(':id')
  public deleteTour(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingService.deleteTour(id);
  }
}
