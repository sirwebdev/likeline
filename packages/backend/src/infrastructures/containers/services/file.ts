import { container } from 'tsyringe'

import { FileService } from '@domains/interfaces/file-service'
import { FSFileService } from '@domains/services/file/fs-service'
import { TestFileService } from '@domains/services/file/test-service'
import { isTestEnvironment } from '@infrastructures/constants/server'
import { FILE_SERVICE_CONTAINER } from '@infrastructures/constants/containers'

if (!isTestEnvironment) {
  container.registerSingleton<FileService>(FILE_SERVICE_CONTAINER, FSFileService)
} else {
  container.registerSingleton<FileService>(FILE_SERVICE_CONTAINER, TestFileService)
}
