const buildFastify = require('../app')

const app = buildFastify({}, testing = true)

afterAll(() => app.close())

test('Create User', async () => {
  const data = {
    name: 'New',
    lastName: 'User',
    idManager: 1,
    mail: 'newuser@gmail.com',
    password: 'SECRET',
    role: 1, // Example role, TBM
    state: { 0: 1 } // Example state
  }

  const response = await app.inject({
    method: 'POST',
    url: '/user/signup',
    payload: data
  })

  expect(response.statusCode).toBe(200)
})

test('Log In', async () => {
  const data = {
    email: 'newuser@gmail.com',
    password: 'SECRET'
  }

  const response = await app.inject({
    method: 'POST',
    url: '/user/login',
    payload: data
  })

  expect(response.statusCode).toBe(200)
})

test('Edit User', async () => {
  const data = {
    name: 'Modified',
    lastName: 'Modified Last',
    idUser: 2,
    states: { entities: { 1: { id_user: 2 } } } // Example states
  }

  const response = await app.inject({
    method: 'POST',
    url: '/user/edit',
    payload: data
  })

  expect(response.statusCode).toBe(200)
})

test('Get All users test', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/user/list'
  })

  expect(response.statusCode).toBe(200)
})

test('Delete user', async () => {
  const data = {
    0: { idUser: 1 } // Example user
  }

  const response = await app.inject({
    method: 'POST',
    url: '/user/delete',
    payload: data
  })

  expect(response.statusCode).toBe(200)
})
