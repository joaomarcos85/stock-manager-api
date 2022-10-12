import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import AppError from '../../errors/AppError'
import BadRequest, { BadRequestDetails } from '../../errors/BadRequest'

export async function ErrorHandlerMidleware (error: Error, request: Request, response: Response, next: NextFunction) {
  if (!(error instanceof AppError) && !(error instanceof ZodError)) {
    console.error(error)
  }
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: error.status,
      statusCode: error.statusCode
    })
  }

  if (error instanceof ZodError) {
    const errors: BadRequestDetails[] = error.errors.map((error) => {
      return {
        message: error.message,
        path: error.path
      }
    })
    const errorApp = new BadRequest(errors)
    return response.status(errorApp.statusCode).json({
      message: errorApp.message,
      status: errorApp.status,
      statusCode: errorApp.statusCode,
      details: errorApp.details
    })
  }

  return response.status(500).json({
    message: 'Internal Server Error',
    status: 'error',
    type: 'unknown',
    statusCode: 500
  })
}
