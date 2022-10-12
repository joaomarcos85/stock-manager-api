import AppError from './AppError'

export default class NotFound extends AppError {
  constructor (message: string) {
    super(message, 404, 'Not Found')
  }
}
