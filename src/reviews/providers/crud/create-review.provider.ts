import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReviewDto } from 'src/reviews/dtos/create-review.dto';
import { Review } from 'src/reviews/review.entity';
import { ToursService } from 'src/tours/providers/tours.service';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class CreateReviewProvider {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,

    private readonly usersService: UsersService,
    private readonly toursService: ToursService,
  ) {}

  public async createReview(createReviewDto: CreateReviewDto) {
    console.log('create review ...');

    const user = await this.usersService.findOneUserBy({
      id: createReviewDto.user,
    });

    if (!user) {
      throw new BadRequestException(
        `User with user ID:${createReviewDto.user} not found.`,
      );
    }

    const tour = await this.toursService.findOneTourBy({
      id: createReviewDto.tour,
    });

    if (!tour) {
      throw new BadRequestException(
        `Tour with tour ID:${createReviewDto.tour} not found.`,
      );
    }

    let review = this.reviewsRepository.create({
      ...createReviewDto,
      user,
      tour,
    });

    try {
      review = await this.reviewsRepository.save(review);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Unable to create a review, please try again later',
      );
    }

    return {
      status: 'success',
      message: 'reveiw created successfully',
      data: review,
    };
  }
}
