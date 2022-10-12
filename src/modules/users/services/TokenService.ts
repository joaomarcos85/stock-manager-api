import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'

export class TokenService {
  generateToken (parameters: Object): string {
    const { secret, expiresIn } = authConfig().jwt
    if (!secret) {
      throw new Error('An APP_SECRET must be provided')
    }
    return sign(parameters, secret, {
      expiresIn
    })
  }
}
