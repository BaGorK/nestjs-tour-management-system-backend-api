import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';
import { UpdateTourDto } from '../../dtos/update-tour.dto';
import { TourImages } from '../../entities/tour-images.entity';
import { Tour } from '../../entities/tour.entity';
import { Repository } from 'typeorm';
import { FindMultipleImagesByIdsProvider } from '../tour-images/find-multiple-images-by-ids.provider';

@Injectable()
export class UpdateTourProvider {
  constructor(
    @InjectRepository(Tour)
    private readonly toursRpository: Repository<Tour>,

    @InjectRepository(TourImages)
    private readonly toursImagesRpository: Repository<TourImages>,

    private readonly findMultipleImagesByIdsProvider: FindMultipleImagesByIdsProvider,

    private readonly fileUploadService: FileUploadService,
  ) {}

  // NOTE: updateTourDto.additionalImages will be an array of image ids
  // but newAdditionalImages they are an array of image paths of the newly uploaded image files and also newCoverImage
  public async updateTour(
    id: string,
    updateTourDto: UpdateTourDto,
    {
      newCoverImage,
      newAdditionalImages,
    }: { newCoverImage: string; newAdditionalImages: string[] },
  ) {
    console.log('update tour...');

    let tour: Tour | undefined = undefined;

    // Find tour to be updated
    try {
      tour = await this.toursRpository.findOneBy({ id });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Unable to find tour by id');
    }

    if (!tour) {
      throw new NotFoundException(`Tour with tour ID: ${id} not found.`);
    }

    /**
     *  Find all old i.e. images before update, image entities from the table.
     *  Find old image ids from the dto bc additionalImages in the dto are an array of image ids. so we preserve that
     *  and we will merge it to the new created instances of TourImages entity and then we create
     *  a relation and we save the tour with that merged old and newly uploaded additional images.
     */
    const oldAdditionalImages = updateTourDto.additionalImages?.length
      ? await this.findMultipleImagesByIdsProvider.findMultipleImagesById(
          updateTourDto.additionalImages,
        )
      : [];

    // If their is a new image upload i.e. uploaded images, we create a new instance of the TourImages entity
    const newUploadedAdditionalImages = newAdditionalImages?.length
      ? newAdditionalImages.map(imagePath =>
          this.toursImagesRpository.create({ url: imagePath }),
        )
      : [];

    // Set the images before update or changing the tour |
    // Before assigning the updated values to the tour instance
    const tourImageIds = tour.additionalImages.map(image => image.id); // In this case images are eager loaded so we need to map over the array of TourImages instance to get the image ids

    /**
     * Filter out the image id that are not sent on the dto as additionImages(an array of image ids)
     * The ids that are not sent over the update dto, they are filtered and finally removed from the file system
     */
    const fileIdsToBeRemoved = tourImageIds.filter(
      image => !updateTourDto.additionalImages?.includes(image),
    );

    const filesToBeRemoved =
      await this.findMultipleImagesByIdsProvider.findMultipleImagesById(
        fileIdsToBeRemoved,
      );

    // Call the removeFile method of the file-upload service class
    for (const { url } of filesToBeRemoved) {
      this.fileUploadService.removeFile(url);
    }

    if (newCoverImage) {
      this.fileUploadService.removeFile(newCoverImage);
    }

    // Update the tour
    const {
      summary,
      priceDiscount,
      price,
      name,
      maxGroupSize,
      duration,
      difficulty,
      description,
    } = updateTourDto;

    tour.name = name ?? tour.name;
    tour.summary = summary ?? tour.summary;
    tour.priceDiscount = priceDiscount ?? tour.priceDiscount;
    tour.price = price ?? tour.price;
    tour.maxGroupSize = maxGroupSize ?? tour.maxGroupSize;
    tour.duration = duration ?? tour.duration;
    tour.difficulty = difficulty ?? tour.difficulty;
    tour.description = description ?? tour.description;
    tour.coverImage = newCoverImage ?? tour.coverImage;

    // 5. Then assign image instances to the tour.additionalImages to create a relation
    tour.additionalImages = [
      ...oldAdditionalImages,
      ...newUploadedAdditionalImages,
    ];

    // 6. and save the tour
    try {
      await this.toursImagesRpository.delete(fileIdsToBeRemoved);

      tour = await this.toursRpository.save(tour);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Unable to update a tour, please try again later.',
      );
    }

    return {
      status: 'success',
      message: 'tour updated successfully',
      data: tour,
    };
  }
}
