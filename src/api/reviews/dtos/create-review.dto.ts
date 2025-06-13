import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 5,
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    example:
      'Absolutely fantastic tour! It’s user-friendly, intuitive, and packed with amazing features',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsUUID()
  user: string;

  @ApiProperty({
    description: 'Id of the tour',
    example: 'fbb2326d-fe46-4b0b-a67f-be57504880bd',
  })
  @IsNotEmpty()
  @IsUUID()
  tour: string;
}
