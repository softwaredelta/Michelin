test('Get All reports by users test', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/form/getByUser/example@gmail.com'
  })

  expect(response.statusCode).toBe(200)
})