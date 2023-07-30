import { container } from 'tsyringe'

import { ENCRYPTION_SERVICE_CONTAINER } from '@api/constants/containers'
import { EncryptionService } from '@domains/interfaces/encription-service'
import { BcryptService } from '@domains/services/encryption/bcrypt-service.ts'

container.registerSingleton<EncryptionService>(ENCRYPTION_SERVICE_CONTAINER, BcryptService)
