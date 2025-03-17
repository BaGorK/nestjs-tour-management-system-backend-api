import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { TourDifficulty } from '../enums/tour-difficulty.enum';
import { Transform } from 'class-transformer';

export class CreateTourDto {
  @ApiProperty({
    description: 'Name of the tour, The name of the tour',
    example: 'The Park Camper',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Maximum group size, How many people can join the tour',
    example: 10,
  })
  @IsNotEmpty()
  @IsInt()
  maxGroupSize: number;

  @ApiProperty({
    description: 'Duration in days, How long the tour is going to be in days',
    example: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Duration must be greater than 1' })
  duration: number;

  @ApiProperty({
    description: 'Difficulty level, The difficulty level of the tour',
    example: 'easy',
    enum: TourDifficulty,
  })
  @IsNotEmpty()
  @IsEnum(TourDifficulty)
  difficulty: TourDifficulty;

  @ApiProperty({
    description: 'Price, The price of the tour',
    example: 497,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    description: 'Discount price, The discount price of the tour',
    example: 397,
  })
  @IsOptional()
  @IsNumber()
  priceDiscount?: number;

  @ApiProperty({
    description: 'Summary, The summary of the tour',
    example: 'Breathtaking hikes in the Canadian Rockies',
  })
  @IsNotEmpty()
  @IsString()
  summary: string;

  @ApiProperty({
    description: 'Description, The description of the tour',
    example: 'Breathtaking hikes in the Canadian Rockies',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Cover image, The cover image of the tour',
    type: 'string',
    format: 'binary',
    required: true,
  })
  coverImage: string;

  @ApiProperty({
    description: 'Additional images, The additional images of the tour',
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: true,
    maxItems: 5,
  })
  additionalImages: string[];

  @ApiProperty({
    description: 'tour guides, put the id of the tour guides.',
    type: 'array',
    items: {
      type: 'string',
      example: 'fd3e487f-4049-4bc3-8518-58872bda8553',
    },
    required: true,
    minItems: 1,
    maxItems: 5,
  })
  @Transform(({ value }) => {
    if (!value) return []; // Ensure it's always an array
    if (Array.isArray(value)) return value; // Already an array, return as is
    if (typeof value === 'string') {
      return value.includes(',')
        ? value.split(',').map(v => v.trim())
        : [value];
    }
    return [];
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsUUID('4', { each: true })
  guides: string[];
}
