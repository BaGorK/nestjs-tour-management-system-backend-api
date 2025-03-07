import { BadRequestException, Injectable } from '@nestjs/common';
import { FindOneReviewByProvider } from '../find-one-review-by.provider';

@Injectable()
export class FindReviewByIdProvider {
  constructor(
    private readonly findOneReviewByProvider: FindOneReviewByProvider,
  ) {}

  public async findReviewById(id: string) {
    console.log('find reviw by id provider ...');

    const review = await this.findOneReviewByProvider.findOneReviewBy({ id });

    if (!review) {
      throw new BadRequestException(`Review with review ID:${id} not found.`);
    }

    return {
      status: 'success',
      message: 'find review by id successfull',
      data: review,
    };
  }
}
