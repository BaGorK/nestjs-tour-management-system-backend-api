import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffService } from 'src/api/staff/providers/staff.service';
import { Staff } from 'src/api/staff/staff.entity';
import { CreateTourDto } from '../../dtos/create-tour.dto';
import { TourImages } from '../../entities/tour-images.entity';
import { Tour } from '../../entities/tour.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CreateTourProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRepository: Repository<Tour>,

    private readonly staffService: StaffService,

    @InjectRepository(TourImages)
    private readonly tourImagesRepository: Repository<TourImages>,
  ) {}

  public async createTour(createTourDto: CreateTourDto) {
    const additionalImages = createTourDto.additionalImages.map(imagePath =>
      this.tourImagesRepository.create({
        url: imagePath,
      }),
    );

    const guides: Staff[] | undefined = [];

    for (const id of createTourDto.guides) {
      const guide = await this.staffService.findOneStaffBy({ id });
      if (!guide) {
        throw new BadRequestException('guide not found when creating a tour');
      }
      guides.push(guide);
    }

    if (!guides?.length) {
      throw new BadRequestException('a tour must have atleast one guide.');
    }

    // create tour and the relation
    let tour = this.toursRepository.create({
      ...createTourDto,
      additionalImages,
      guides,
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
