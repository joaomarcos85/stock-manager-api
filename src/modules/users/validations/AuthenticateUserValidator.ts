import { z } from 'zod'
import { Validator } from '../../../shared/validations/Validator'
import { IAuthenticateUserServiceRequest } from '../services/AuthenticateUserService'

export class AuthenticateUserValidator implements Validator<IAuthenticateUserServiceRequest> {
  public async execute (request: IAuthenticateUserServiceRequest) {
    const data = z.object({
      email: z.string().email(),
      password: z.string().min(1)
    }).parse(request)
    return data
  }
}
