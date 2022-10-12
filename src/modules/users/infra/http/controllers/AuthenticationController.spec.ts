import 'reflect-metadata'
import '@shared/container/index.test-jest'
import { AuthenticationController } from './AuthenticationController'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateUserService from '@modules/users/services/CreateUserService'
import authConfig from '@config/auth'

jest.mock('@config/auth')
const authConfigMocked = authConfig as jest.MockedFunction<typeof authConfig>
authConfigMocked.mockReturnValue({
  jwt: {
    secret: '1234',
    expiresIn: '1d'
  }
})

const mockResponse = {
  json: (res: any) => res
} as any as Response

describe('Perform the login', () => {
  it('should be able to login', async () => {
    const createUserService = container.resolve(CreateUserService)
    await createUserService.execute({
      email: 'john.doe@test.com',
      password: '1234'
    })

    const mockRequest = {
      body: {
        email: 'john.doe@test.com',
        password: '1234'
      }
    } as any as Request

    const controller = new AuthenticationController()
    await expect(controller.authenticate(mockRequest, mockResponse)).resolves.toEqual({
      token: expect.any(String),
      email: 'john.doe@test.com'
    })
  })

  it('should not be able to login with empty email or password', async () => {
    const mockRequest = {
      body: {
        email: '',
        password: ''
      }
    } as any as Request

    const controller = new AuthenticationController()
    const rejects = expect(controller.authenticate(mockRequest, mockResponse)).rejects
    await rejects.toHaveProperty('errors[0].validation', 'email')
    await rejects.toHaveProperty('errors[0].message', 'Invalid email')
    await rejects.toHaveProperty('errors[0].path[0]', 'email')
    await rejects.toHaveProperty('errors[1].message', 'String must contain at least 1 character(s)')
    await rejects.toHaveProperty('errors[1].path[0]', 'password')
  })

  it('should not be able to login with unregistered user', async () => {
    const mockRequest = {
      body: {
        email: 'john.doe-1@test.com',
        password: '1234'
      }
    } as any as Request

    const controller = new AuthenticationController()
    await expect(controller.authenticate(mockRequest, mockResponse)).rejects.toEqual({
      message: 'Invalid e-mail',
      statusCode: 400,
      status: 'Bad Request'
    })
  })

  it('should not be able to login with invalid password', async () => {
    const createUserService = container.resolve(CreateUserService)
    await createUserService.execute({
      email: 'john.doe-2@test.com',
      password: '1234'
    })
    const mockRequest = {
      body: {
        email: 'john.doe-2@test.com',
        password: '11111'
      }
    } as any as Request

    const controller = new AuthenticationController()
    await expect(controller.authenticate(mockRequest, mockResponse)).rejects.toEqual({
      message: 'Invalid password!',
      status: 'Unauthorized',
      statusCode: 401
    })
  })

  it('should not be able to login without APP_SECRET environment variable', async () => {
    authConfigMocked.mockReturnValue({
      jwt: {
        secret: undefined,
        expiresIn: '1d'
      }
    })

    const createUserService = container.resolve(CreateUserService)
    await createUserService.execute({
      email: 'john.doe-3@test.com',
      password: '1234'
    })
    const mockRequest = {
      body: {
        email: 'john.doe-3@test.com',
        password: '1234'
      }
    } as any as Request

    const controller = new AuthenticationController()
    await expect(controller.authenticate(mockRequest, mockResponse)).rejects.toThrowError('An APP_SECRET must be provided')
  })
})
