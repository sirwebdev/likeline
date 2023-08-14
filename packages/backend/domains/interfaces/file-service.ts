export class FileService {
  saveFile: (tempFileName: string, filename: string) => Promise<string>
  deleteFile: (oldFilename: string,) => Promise<void>
}
