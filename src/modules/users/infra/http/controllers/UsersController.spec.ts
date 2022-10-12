import 'reflect-metadata'
import '@shared/container/index.test-jest'
import { Request, Response } from 'express'
import { UsersController } from '@modules/users/infra/http/controllers/UsersController'

jest.mock('uuid', () => ({
  v4: () => '00000000-0000-0000-0000-000000000000'
}))

const mockResponse = {
  json: (res: any) => res
} as any as Response

describe('Create a user', () => {
  it('should be able to create a new user', async () => {
    const mockRequest = {
      body: {
        email: 'john.doe@test.com',
        password: '1234'
      }
    } as any as Request

    const controller = new UsersController()
    await expect(controller.create(mockRequest, mockResponse)).resolves.toEqual({
      id: '00000000-0000-0000-0000-000000000000',
      email: 'john.doe@test.com'
    })
  })

  it('should not be able to create a new user with invalid email', async () => {
    const mockRequest = {
      body: {
        email: 'john.doe.com',
        password: '1234'
      }
    } as any as Request
    const controller = new UsersController()
    const rejects = expect(controller.create(mockRequest, mockResponse)).rejects
    await rejects.toHaveProperty('errors[0].validation', 'email')
    await rejects.toHaveProperty('errors[0].path[0]', 'email')
    await rejects.toHaveProperty('errors[0].message', 'Invalid email')
  })

  it('should not be able to create a new user with empty password', async () => {
    const mockRequest = {
      body: {
        email: 'john.doe@test.com',
        password: ''
      }
    } as any as Request

    const controller = new UsersController()
    const rejects = expect(controller.create(mockRequest, mockResponse)).rejects
    await rejects.toHaveProperty('errors[0].path[0]', 'password')
    await rejects.toHaveProperty('errors[0].message', 'String must contain at least 1 character(s)')
  })

  it('should not be able to create a new user with an already used email', async () => {
    const mockRequest = {
      body: {
        email: 'john.doe-1@test.com',
        password: '1234'
      }
    } as any as Request

    const controller = new UsersController()
    await controller.create(mockRequest, mockResponse)
    const rejects = expect(controller.create(mockRequest, mockResponse)).rejects
    await rejects.toHaveProperty('message', 'Email already registered')
    await rejects.toHaveProperty('status', 'Conflict')
    await rejects.toHaveProperty('statusCode', 409)
  })
})
