import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ReviewsService } from './providers/reviews.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Role } from 'src/auth/decorator/role.decorator';
import { Roles } from 'src/common/enum/Roles.enum';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // find all reviews
  @ApiOperation({
    summary: 'Find All Reviews',
    description: 'Find all Reviews',
  })
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @Get()
  public findAllReviews() {
    return this.reviewsService.findAll();
  }

  // create review
  @ApiOperation({
    summary: 'Create a Reveiw',
    description: 'Create a Review',
  })
  @ApiBody({
    type: CreateReviewDto,
    required: true,
  })
  @ApiBearerAuth()
  @Role(Roles.USER)
  @Post()
  public createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  // find review by id
  @ApiOperation({
    summary: 'Find Review By ID',
    description: 'Find Review By ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Review ID',
    example: '910d0cc4-e21b-4ef8-86db-94ca84ae1d8c',
  })
  @ApiBearerAuth()
  @Get(':id')
  public findReviewByid(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.findReviewById(id);
  }

  // update review
  @ApiOperation({
    summary: 'Update Reveiw',
    description: 'Update Reveiw',
  })
  @ApiBody({
    type: UpdateReviewDto,
    required: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Review ID',
    example: '4a8da398-063f-44ea-b351-2132aa648233',
  })
  @ApiBearerAuth()
  @Role(Roles.USER, Roles.ADMIN)
  @Patch(':id')
  public updateReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  // delete review
  @ApiOperation({
    summary: 'Delete Review',
    description: 'Delete Review',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Review ID',
    example: '430cc649-a069-4e18-88bc-d74a7c8c2cc4',
  })
  @ApiBearerAuth()
  @Role(Roles.USER, Roles.ADMIN)
  @Delete(':id')
  public deleteReview(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteReview(id);
  }
}
