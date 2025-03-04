import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/auth/decorator/role.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Roles } from 'src/common/enum/Roles.enum';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';
import { TourImagesUpload } from './decorators/tour-images-upload.decorator';
import { CreateTourDto } from './dtos/create-tour.dto';
import { UpdateTourDto } from './dtos/update-tour.dto';
import { ITourMultipleFiles } from './interfaces/tour-multiple-files.interface';
import { ToursService } from './providers/tours.service';

@Controller('tours')
export class ToursController {
  constructor(
    private readonly toursService: ToursService,
    private readonly fileUploadService: FileUploadService,
  ) {}
  // find tour with booking details
  @ApiOperation({
    summary: 'Find Tour with Booking Details',
  })
  @ApiParam({
    name: 'id',
    description: 'tour ID',
    required: true,
    example: 'ccd3051f-b7df-4cd4-8ae6-eb02045f6dfd',
  })
  @ApiBearerAuth()
  @Role(Roles.ADMIN, Roles.LEAD_GUIDE, Roles.GUIDE)
  @Get('with-bookings/:id')
  public findTourWithBookings(@Param('id', ParseUUIDPipe) id: string) {
    return this.toursService.findTourWithBookings(id);
  }

  // get all tours
  @ApiOperation({
    summary: 'Get all Tours',
    description:
      'Gett all tours, you can use this route to get all tours available',
  })
  @Get()
  @Auth(AuthType.None)
  getAllTours() {
    return this.toursService.getAllTours();
  }

  // create tour
  @ApiOperation({
    summary: 'Create a new Tour',
    description: 'Create a new tour, you can use this route to create a tour.',
  })
  @ApiBody({
    type: CreateTourDto,
    required: true,
    description: 'Tour data',
  })
  @ApiConsumes('multipart/form-data')
  @TourImagesUpload()
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @Post()
  createTour(
    @UploadedFiles()
    files: ITourMultipleFiles,
    @Body() createTourDto: CreateTourDto,
  ) {
    if (!files.coverImage?.length) {
      throw new BadRequestException('Cover image is required');
    }

    if (!files.additionalImages?.length) {
      throw new BadRequestException(
        'At least one additional image is required',
      );
    }

    createTourDto.coverImage = this.fileUploadService.getFilePath(
      files.coverImage[0],
    );
    createTourDto.additionalImages = files.additionalImages.map(image =>
      this.fileUploadService.getFilePath(image),
    );

    return this.toursService.createTour(createTourDto);
  }

  // get tour by id
  @ApiOperation({
    summary: 'Get a Tour by ',
    description:
      'Get a Tour by Id, use this endpint to fetch a tour by passing tour id as a prameter',
  })
  @ApiParam({
    name: 'id',
    description: 'tour id',
    required: true,
    example: '9b37835e-2259-4abc-a242-b8065660aef9',
  })
  @Auth(AuthType.None)
  @Get(':id')
  getTourById(@Param('id', ParseUUIDPipe) id: string) {
    return this.toursService.getTour(id);
  }

  // update tour by id
  @ApiOperation({
    summary: 'Update Tour by id',
    description: 'update tour by id, use this route to update or edit a tour.',
  })
  @ApiBody({
    type: UpdateTourDto,
    required: true,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the tour you want to update',
    example: '150b0370-2828-453b-95ec-6bee8bf252d1',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @TourImagesUpload()
  @Role(Roles.ADMIN, Roles.LEAD_GUIDE)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  updateTour(
    @UploadedFiles() files: ITourMultipleFiles,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    let newAdditionalImages: string[] = [];
    let newCoverImage: string;

    if (files && files.coverImage?.length) {
      newCoverImage = this.fileUploadService.getFilePath(files.coverImage[0]);
    }

    if (files && files.additionalImages?.length) {
      newAdditionalImages = files.additionalImages.map(image =>
        this.fileUploadService.getFilePath(image),
      );
    }

    return this.toursService.updateTour(id, updateTourDto, {
      newCoverImage,
      newAdditionalImages,
    });
  }

  // delete tour by id
  @ApiOperation({
    summary: 'Delete a Tour',
    description: 'Use this endpoint to delete a tour by id',
  })
  @ApiParam({
    name: 'id',
    description: 'id of the tour to be deleted',
    required: true,
    example: '0692d757-6121-4bc9-854e-29234141eac0',
  })
  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTour(@Param('id', ParseUUIDPipe) id: string) {
    return this.toursService.deleteTour(id);
  }
}
