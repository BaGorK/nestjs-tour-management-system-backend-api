import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTourDto } from 'src/tours/dtos/create-tour.dto';
import { TourImages } from 'src/tours/entities/tour-images.entity';
import { Tour } from 'src/tours/entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateTourProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,

    @InjectRepository(TourImages)
    private readonly tourImagesRepository: Repository<TourImages>,
  ) {}

  public async createTour(createTourDto: CreateTourDto) {
    // console.log('started');
    // await new Promise(resolve => setTimeout(resolve, 11 * 1000));
    // console.log('ended...');
    // create images first
    const additionalImages = createTourDto.additionalImages.map(imagePath =>
      this.tourImagesRepository.create({
        url: imagePath,
      }),
    );

    // create tour and the relation
    let tour = this.toursRepository.create({
      ...createTourDto,
      additionalImages,
    });

    try {
      tour = await this.toursRepository.save(tour);

      return {
        status: 'success',
        message: 'Tour created successfully',
        data: tour,
      };
    } catch (err) {
      console.log(err);
      throw new RequestTimeoutException(
        (err as Error).message ||
          'Unable to create a tour at the moment please try again.',
      );
    }
  }
}
