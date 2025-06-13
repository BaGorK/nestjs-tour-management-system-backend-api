import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateReviewDto } from 'src/api/reviews/dtos/update-review.dto';
import { Review } from 'src/api/reviews/review.entity';
import { Tour } from 'src/api/tours/entities/tour.entity';
import { ToursService } from 'src/api/tours/providers/tours.service';
import { UsersService } from 'src/api/users/providers/users.service';
import { User } from 'src/api/users/user.entity';
import { Repository } from 'typeorm';
import { FindOneReviewByProvider } from '../find-one-review-by.provider';

@Injectable()
export class UpdateReviewProvider {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,

    private readonly usersService: UsersService,
    private readonly toursService: ToursService,

    private readonly findOneReviewByProvider: FindOneReviewByProvider,
  ) {}

  public async updateReview(id: string, updateReviewDto: UpdateReviewDto) {
    console.log('update reveiw provider...');

    let user: User | undefined;
    let tour: Tour | undefined;

    let review = await this.findOneReviewByProvider.findOneReviewBy({ id });

    if (!review) {
      throw new BadRequestException(`Review with review ID:${id} not found.`);
    }

    if (updateReviewDto.user) {
      user = await this.usersService.findOneUserBy({
        id: updateReviewDto.user,
      });
    }

    if (updateReviewDto.tour) {
      tour = await this.toursService.findOneTourBy({
        id: updateReviewDto.tour,
      });
    }

    review.user = user ?? review.user;
    review.tour = tour ?? review.tour;
    review.comment = updateReviewDto.comment ?? review.comment;
    review.rating = updateReviewDto.rating ?? review.rating;

    try {
      review = await this.reviewsRepository.save(review);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Unable to update review, please try again later.',
      );
    }

    return {
      status: 'success',
      message: 'review updated successfully',
      data: review,
    };
  }
}
