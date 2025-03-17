import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';
import { StaffModule } from 'src/staff/staff.module';
import { TourImages } from './entities/tour-images.entity';
import { Tour } from './entities/tour.entity';
import { CreateTourProvider } from './providers/crud/create-tour.provider';
import { DeleteTourProvider } from './providers/crud/delete-tour.provider';
import { GetAllToursProvider } from './providers/crud/get-all-tours.provider';
import { GetTourByIdProvider } from './providers/crud/get-tour-by-id.provider';
import { UpdateTourProvider } from './providers/crud/update-tour.provider';
import { FindOneTourByProvider } from './providers/find-one-tour-by.provider';
import { FindTourWithAllDetailsProvider } from './providers/find-tour-with-all-details.provider';
import { FindTourWithBookingsProvider } from './providers/find-tour-with-bookings.provider';
import { FindTourWithReviewsProvider } from './providers/find-tour-with-reviews.provider';
import { FindMultipleImagesByIdsProvider } from './providers/tour-images/find-multiple-images-by-ids.provider';
import { ToursService } from './providers/tours.service';
import { ToursController } from './tours.controller';

@Module({
  controllers: [ToursController],
  providers: [
    ToursService,
    GetAllToursProvider,
    CreateTourProvider,
    UpdateTourProvider,
    DeleteTourProvider,
    GetTourByIdProvider,
    FindOneTourByProvider,
    FindMultipleImagesByIdsProvider,
    FindTourWithBookingsProvider,
    FindTourWithReviewsProvider,
    FindTourWithAllDetailsProvider,
  ],
  imports: [
    TypeOrmModule.forFeature([Tour, TourImages]),
    FileUploadModule,
    forwardRef(() => StaffModule),
  ],
  exports: [ToursService],
})
export class ToursModule {}
