import AppError from './AppError'

export interface BadRequestDetails {
  path: Array<string | number>
  message: string
}

export default class BadRequest extends AppError {
  public readonly details?: BadRequestDetails[]

  constructor (message: string | BadRequestDetails[]) {
    const textMessage = (typeof message === 'string') ? message : 'Invalid field'
    super(textMessage, 400, 'Bad Request')

    if (!(typeof message === 'string')) {
      this.details = message
    }
  }
}
