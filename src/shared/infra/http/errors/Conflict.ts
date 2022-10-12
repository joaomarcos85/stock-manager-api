import AppError from '@shared/infra/http/errors/AppError'

export default class Conflict extends AppError {
  constructor (message: string) {
    super(message, 409, 'Conflict')
  }
}
