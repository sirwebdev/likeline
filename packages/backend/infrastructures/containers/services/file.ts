import { container } from 'tsyringe'

import { FileService } from '@domains/interfaces/file-service'
import { FSFileService } from '@domains/services/file/fs-service'
import { FILE_SERVICE_CONTAINER } from '@infrastructures/constants/containers'

container.registerSingleton<FileService>(FILE_SERVICE_CONTAINER, FSFileService)
