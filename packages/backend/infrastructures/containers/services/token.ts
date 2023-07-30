import { container } from 'tsyringe'

import { TokenService } from '@domains/interfaces/token-service'
import { JwtService } from '@domains/services/token/jwk-service'
import { TOKEN_SERVICE_CONTAINER } from '@api/constants/containers'

container.registerSingleton<TokenService>(TOKEN_SERVICE_CONTAINER, JwtService)
