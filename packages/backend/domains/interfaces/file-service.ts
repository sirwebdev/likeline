export class FileService {
  saveFile: (filename: string, tempFile: string) => Promise<string>
  deleteFile: (oldFilename: string,) => Promise<void>
}
