import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TourImages } from 'src/tours/entities/tour-images.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class FindMultipleImagesByIdsProvider {
  constructor(
    @InjectRepository(TourImages)
    private readonly tourImagesRepository: Repository<TourImages>,
  ) {}

  public async findMultipleImagesById(
    imageIds: string[],
  ): Promise<TourImages[]> {
    console.log('find multiple images by ids');

    try {
      const images = await this.tourImagesRepository.find({
        where: {
          id: In(imageIds),
        },
      });

      return images;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to finnd multiple images by IDs',
      );
    }
  }
}
