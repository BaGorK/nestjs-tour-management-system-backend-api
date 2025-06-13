import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tour } from '../entities/tour.entity';

@Injectable()
export class FindTourWithReviewsProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,
  ) {}

  public async findTourWithReviews(id: string) {
    console.log('find tour with reviews provider...');

    let tour: Tour | undefined;
    try {
      tour = await this.toursRepository.findOne({
        where: { id },
        relations: {
          reviews: true,
        },
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to fetch tour by id, please try again later.',
      );
    }

    if (!tour) {
      throw new NotFoundException(`Tour by tour ID: ${id} not found.`);
    }

    return {
      status: 'success',
      message: 'find tour with tour review detaile successfull',
      data: tour,
    };
  }
}
