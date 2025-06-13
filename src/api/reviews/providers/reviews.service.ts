import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { UpdateReviewDto } from '../dtos/update-review.dto';
import { Review } from '../review.entity';
import { CreateReviewProvider } from './crud/create-review.provider';
import { DeleteReviewProvider } from './crud/delete-review.provider';
import { FindAllReviewsProvider } from './crud/find-all-reviews.provider';
import { FindReviewByIdProvider } from './crud/find-review-by-id.provider';
import { UpdateReviewProvider } from './crud/update-review.provider';
import { FindOneReviewByProvider } from './find-one-review-by.provider';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly findOneReviewByProvider: FindOneReviewByProvider,
    private readonly findAllReviewsProvider: FindAllReviewsProvider,
    private readonly createReviewProvider: CreateReviewProvider,
    private readonly deleteReviewProvider: DeleteReviewProvider,
    private readonly updateReviewProvider: UpdateReviewProvider,
    private readonly findReviewByIdProvider: FindReviewByIdProvider,
  ) {}

  // find all reviews
  public findAll() {
    return this.findAllReviewsProvider.findAll();
  }

  // create review
  public createReview(createReviewDto: CreateReviewDto) {
    return this.createReviewProvider.createReview(createReviewDto);
  }

  // find review by id
  public findReviewById(id: string) {
    return this.findReviewByIdProvider.findReviewById(id);
  }

  // update review
  public updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    return this.updateReviewProvider.updateReview(id, updateReviewDto);
  }

  // delete review
  public deleteReview(id: string) {
    return this.deleteReviewProvider.deleteReview(id);
  }

  // find one review by
  public findOneBy(options: Partial<Review>) {
    return this.findOneReviewByProvider.findOneReviewBy(options);
  }
}
