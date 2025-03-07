import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/reviews/review.entity';
import { Repository } from 'typeorm';
import { FindOneReviewByProvider } from '../find-one-review-by.provider';

@Injectable()
export class DeleteReviewProvider {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,

    private readonly findOneReviewByProvider: FindOneReviewByProvider,
  ) {}

  public async deleteReview(id: string) {
    console.log('delete review provider...');

    const review = await this.findOneReviewByProvider.findOneReviewBy({ id });

    if (!review) {
      throw new BadRequestException('No Reveiw is found to delete');
    }

    try {
      await this.reviewsRepository.delete(id);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to delete a review, please try again latter',
      );
    }

    return {
      status: 'success',
      message: `Review with review ID:${id} is deleted successully`,
    };
  }
}
