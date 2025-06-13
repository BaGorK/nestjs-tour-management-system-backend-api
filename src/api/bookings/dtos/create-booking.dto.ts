import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'id of a tour',
    example: '9b353c95-3bb4-498d-910b-810e88fc9355',
  })
  @IsNotEmpty()
  @IsString()
  tour: string;

  @ApiProperty({
    description: 'id of a user',
    example: '718524eb-ec10-4623-b266-33b1344c3e42',
  })
  @IsNotEmpty()
  @IsString()
  user: string;

  @ApiProperty({
    description: 'price of a tour',
    example: 2199,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'is booking paid?',
    example: true,
  })
  @IsBoolean()
  isPaid: boolean;
}
