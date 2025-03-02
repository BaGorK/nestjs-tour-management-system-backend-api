import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from 'src/common/file-upload/file-upload.module';
import { TourImages } from './entities/tour-images.entity';
import { Tour } from './entities/tour.entity';
import { CreateTourProvider } from './providers/create-tour.provider';
import { DeleteTourProvider } from './providers/delete-tour.provider';
import { FindOneTourByProvider } from './providers/find-one-tour-by.provider';
import { GetAllToursProvider } from './providers/get-all-tours.provider';
import { GetTourByIdProvider } from './providers/get-tour-by-id.provider';
import { FindMultipleImagesByIdsProvider } from './providers/tour-images/find-multiple-images-by-ids.provider';
import { ToursService } from './providers/tours.service';
import { UpdateTourProvider } from './providers/update-tour.provider';
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
})
export class ToursModule {}
