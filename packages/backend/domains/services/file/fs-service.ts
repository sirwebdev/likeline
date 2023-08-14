import fs from 'fs';
import path from 'path';
import { injectable } from "tsyringe";

import { FileService } from "@domains/interfaces/file-service";
import { TEMP_FOLDER, UPLOADS_FOLDER } from '@infrastructures/constants/server';

@injectable()
export class FSFileService implements FileService {
  async saveFile(tempFilename: string, filename: string): Promise<string> {
    const sourcePath = path.join(TEMP_FOLDER, tempFilename);
    const destinationPath = path.join(UPLOADS_FOLDER, filename);
    await this.moveFile(sourcePath, destinationPath);
    return destinationPath;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(UPLOADS_FOLDER, filename);
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.error('Error deleting file:', err);
    }
  }

  private async moveFile(sourcePath: string, destinationPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
