const buildFastify = require('../app')

const app = buildFastify({}, testing = true)

afterAll(() => app.close())

test('Create selling point', async () => {
  const data = {
    type: 1, //Example category
    zone: 1, //Example state
    address: "Dirección ejemplo",
    rating: 3,
    name: "Sucursal ejemplo",
    phone: "123456789"
  };

  const response = await app.inject({
    method: 'POST',
    url: '/sellingPoint/addSellingPoint',
    payload: data
  })

  expect(response.statusCode).toBe(200)
})

test('Edit selling point', async () => {
  const data = {
    type: 1, //Example category
    zone: 2, //Example state
    address: "Dirección editada",
    name: "Sucursal editada",
    phone: "987654321",
    spId: 1
  };

  const response = await app.inject({
    method: 'POST',
    url: '/sellingPoint/editSellingPoint',
    payload: data
  })

  expect(response.statusCode).toBe(200)
})

test('Get All selling points', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/sellingPoint/list'
  })

  expect(response.statusCode).toBe(200)
})
