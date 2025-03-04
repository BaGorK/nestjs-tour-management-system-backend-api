import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class InitializeBookingPaymentDto {
  @ApiProperty({
    description: 'id of the tour to book',
    example: 'c8b43016-711d-49c4-8a25-4ae2861dd6c6',
  })
  @IsUUID()
  tour: string;

  @ApiPropertyOptional({
    description:
      'id of the user, it is optional we use the currently logged in users id instead',
    example: '9778af09-9c5f-4d53-a048-f3dcf2267577',
  })
  @IsUUID()
  @IsOptional()
  user: string;
}
