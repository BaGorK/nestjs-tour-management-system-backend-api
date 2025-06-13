import { Module } from '@nestjs/common';
import { ToursModule } from '../tours/tours.module';
import { UsersModule } from 'src/api/users/users.module';
import { CreateReviewProvider } from './providers/crud/create-review.provider';
import { DeleteReviewProvider } from './providers/crud/delete-review.provider';
import { FindAllReviewsProvider } from './providers/crud/find-all-reviews.provider';
import { FindReviewByIdProvider } from './providers/crud/find-review-by-id.provider';
import { UpdateReviewProvider } from './providers/crud/update-review.provider';
import { FindOneReviewByProvider } from './providers/find-one-review-by.provider';
import { ReviewsService } from './providers/reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';

@Module({
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    CreateReviewProvider,
    FindAllReviewsProvider,
    FindReviewByIdProvider,
    UpdateReviewProvider,
    DeleteReviewProvider,
    FindOneReviewByProvider,
  ],
  imports: [UsersModule, ToursModule, TypeOrmModule.forFeature([Review])],
})
export class ReviewsModule {}
