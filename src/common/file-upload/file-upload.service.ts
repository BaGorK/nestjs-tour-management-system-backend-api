import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

type ValidMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validMimeTypes: ValidMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

@Injectable()
export class FileUploadService {
  public uploadFileLocal(file: Express.Multer.File) {
    const filePath =
      file.destination.split('/').slice(-2).join('/') + '/' + file.filename;

    const imageUrl = `${process.env.BACKEND_URL}/${filePath}`;

    return imageUrl;
  }

  public saveImageToStorage({ dirName }: { dirName: string }) {
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
        if (validMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new Error(
              'Invalid file type! Only PNG, JPG, and JPEG are allowed.',
            ),
            false,
          );
        }
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
