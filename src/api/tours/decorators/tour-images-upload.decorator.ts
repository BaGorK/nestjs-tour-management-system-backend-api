import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';
import { TourUploadFileNames } from '../constants/tour-upload-file-names';
import { FileUploadDirNames } from 'src/lib/constants/file-upload-dir-names';

export function TourImagesUpload() {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(
        [
          { name: TourUploadFileNames.coverImage, maxCount: 1 },
          { name: TourUploadFileNames.additionalImages, maxCount: 5 },
        ],
        FileUploadService.saveImageToStorage({
          dirName: FileUploadDirNames.tour,
        }),
      ),
    ),
  );
}
