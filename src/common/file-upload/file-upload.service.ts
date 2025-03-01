import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { MaxImageFileSize } from 'src/lib/constants/max-image-file-sez';
import { v4 as uuidv4 } from 'uuid';

type ValidMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validMimeTypes: ValidMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

@Injectable()
export class FileUploadService {
  constructor(private readonly configService: ConfigService) {}

  public getFilePath(file: Express.Multer.File) {
    let filePath =
      file.destination.split('/').slice(-2).join('/') + '/' + file.filename;

    filePath = `${this.configService.get('appConfig.backendUrl')}/${filePath}`;

    return filePath;
  }

  public static saveImageToStorage({ dirName }: { dirName: string }) {
    const uploadDirRelative = `public/uploads/${dirName}`;
    const uploadsDirRoot = path.resolve(
      __dirname,
      `../../../${uploadDirRelative}`,
    );

    // Step 5: Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDirRoot)) {
      fs.mkdirSync(uploadsDirRoot, { recursive: true });
    }

    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadsDirRoot);
        },
        filename: async (req, file, cb) => {
          const fileExtension = path.extname(file.originalname).toLowerCase();
          const fileName = `${dirName}-${uuidv4()}${fileExtension}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!validMimeTypes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Invalid file type! Only PNG, JPG, and JPEG are allowed.',
            ),
            false,
          );
        }

        if (file.size > MaxImageFileSize) {
          return cb(
            new BadRequestException(
              `File size exceeds the ${MaxImageFileSize}MB limit.`,
            ),
            false,
          );
        }

        cb(null, true);
      },
    };
  }

  public removeFile(fullFilePath: string): void {
    fs.unlink(fullFilePath, err => {
      if (err) {
        console.error(`Error removing file: ${err.message}`);
      }
    });
  }
}
