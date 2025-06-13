import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Review } from '../review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneReviewByProvider {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
  ) {}

  public async findOneReviewBy(options: Partial<Review>) {
    console.log('find one review by ...');

    try {
      const review = await this.reviewsRepository.findOneBy(options);

      return review;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to find a review, please try again later.',
      );
    }
  }
}
