import { injectable } from "tsyringe";

import { FileService } from "@domains/interfaces/file-service";

@injectable()
export class TestFileService implements FileService {
  async saveFile(_tempFilename: string, _filename: string): Promise<string> {
    return 'SOME_FILE.file'
  }

  async deleteFile(_filename: string): Promise<void> {
    return
  }

}
