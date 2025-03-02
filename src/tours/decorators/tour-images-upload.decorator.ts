import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/common/file-upload/file-upload.service';

export function TourImagesUpload() {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(
        [
          { name: 'coverImage', maxCount: 1 },
          { name: 'additionalImages', maxCount: 5 },
        ],
        FileUploadService.saveImageToStorage({ dirName: 'tours' }),
      ),
    ),
  );
}
