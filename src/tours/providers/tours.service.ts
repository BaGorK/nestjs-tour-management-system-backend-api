import { Injectable } from '@nestjs/common';
import { CreateTourDto } from '../dtos/create-tour.dto';
import { UpdateTourDto } from '../dtos/update-tour.dto';
import { Tour } from '../entities/tour.entity';
import { CreateTourProvider } from './crud/create-tour.provider';
import { DeleteTourProvider } from './crud/delete-tour.provider';
import { GetAllToursProvider } from './crud/get-all-tours.provider';
import { GetTourByIdProvider } from './crud/get-tour-by-id.provider';
import { UpdateTourProvider } from './crud/update-tour.provider';
import { FindOneTourByProvider } from './find-one-tour-by.provider';

@Injectable()
export class ToursService {
  constructor(
    private readonly getTourByIdProvider: GetTourByIdProvider,
    private readonly getAllToursProvider: GetAllToursProvider,
    private readonly deleteTourProvider: DeleteTourProvider,
    private readonly createTourProvider: CreateTourProvider,
    private readonly updateTourProvider: UpdateTourProvider,
    private readonly findOneTourByProvider: FindOneTourByProvider,
  ) {}

  // get all tours
  public getAllTours() {
    return this.getAllToursProvider.getAllTours();
  }

  // create tour
  public createTour(createTourDto: CreateTourDto) {
    return this.createTourProvider.createTour(createTourDto);
  }

  // get tour by id
  public getTour(id: string) {
    return this.getTourByIdProvider.getTour(id);
  }

  // update tour
  public updateTour(
    id: string,
    updateTourDto: UpdateTourDto,
    {
      newCoverImage,
      newAdditionalImages,
    }: { newCoverImage: string; newAdditionalImages: string[] },
  ) {
    return this.updateTourProvider.updateTour(id, updateTourDto, {
      newCoverImage,
      newAdditionalImages,
    });
  }

  // delete tour
  public deleteTour(id: string) {
    return this.deleteTourProvider.deleteTour(id);
  }

  // find one tour by
  public findOneTourBy(options: Partial<Tour>) {
    return this.findOneTourByProvider.findOneTourBy(options);
  }
}
