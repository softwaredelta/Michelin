const buildFastify = require('../app')

const app = buildFastify({}, testing = true)

afterAll(() => app.close())

test('Get All users test', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/users'
  })

  expect(response.statusCode).toBe(200)
})
