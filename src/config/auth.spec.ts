import authConfig from '@config/auth'
describe('Check authentication configuration', () => {
  test('if the config function is returning the correct value', async () => {
    const config = authConfig()
    expect(config).toHaveProperty('jwt.secret')
    expect(config).toHaveProperty('jwt.expiresIn')
  })
})
