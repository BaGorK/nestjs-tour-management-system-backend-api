import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from 'src/tours/entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetAllToursProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,
  ) {}

  public async getAllTours() {
    console.log('get all tours...');
    try {
      const tours = await this.toursRepository.find();

      return {
        status: 'success',
        message: 'get all tours',
        data: tours,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Failed to fetch tours. Please try again.',
      );
    }
  }
}
