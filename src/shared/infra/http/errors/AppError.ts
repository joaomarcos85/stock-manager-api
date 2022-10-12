export default class AppError {
  public readonly statusCode: number
  public readonly message: string
  public readonly status: string

  constructor (message: string = 'Error', statusCode: number = 500, status = 'Internal Server Error') {
    this.message = message
    this.statusCode = statusCode
    this.status = status
  }
}
