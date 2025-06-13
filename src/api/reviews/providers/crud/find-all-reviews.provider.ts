import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/api/reviews/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindAllReviewsProvider {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  public async findAll() {
    console.log('find all reviews...');

    try {
      const reviews = await this.reviewsRepository.find();

      return {
        status: 'success',
        message: 'find all reviews successfull',
        data: reviews,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find all reviews, please try again later.',
      );
    }
  }
}
