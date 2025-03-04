import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';
import { TourImages } from './entities/tour-images.entity';
import { Tour } from './entities/tour.entity';
import { CreateTourProvider } from './providers/crud/create-tour.provider';
import { DeleteTourProvider } from './providers/crud/delete-tour.provider';
import { GetAllToursProvider } from './providers/crud/get-all-tours.provider';
import { GetTourByIdProvider } from './providers/crud/get-tour-by-id.provider';
import { UpdateTourProvider } from './providers/crud/update-tour.provider';
import { FindOneTourByProvider } from './providers/find-one-tour-by.provider';
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
  ],
  imports: [TypeOrmModule.forFeature([Tour, TourImages]), FileUploadModule],
  exports: [ToursService],
})
export class ToursModule {}
