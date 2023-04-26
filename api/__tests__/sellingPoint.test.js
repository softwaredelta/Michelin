const buildFastify = require('../app')

const app = buildFastify({}, testing = true)

afterAll(() => app.close())

test('Get All selling points', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/sellingPoint/list'
  })

  expect(response.statusCode).toBe(200)
})
