const buildFastify = require('../app')

const app = buildFastify({}, (testing = true))

afterAll(() => app.close())

test('Add user report', async () => {
  const data = {
    mail: 'example@gmail.com',
    id_category: 1,
    id_user: 1,
    exteriorGrade: 80,
    interiorGrade: 85,
    clientGrade: 90,
    managerGrade: 95,
    spId: 1,
    fileName: 'exampleReport.pdf',
    duration: 150,
    comment: 'Example comment',
    managerName: 'Store manager',
    preparation: '{"questions":[]}',
    exterior: '{"questions":[]}',
    interior: '{"questions":[]}',
    client: '{"questions":[]}',
    manager: '{"questions":[]}',
    userName: 'Example User'

  }

  const response = await app.inject({
    method: 'POST',
    url: '/form/postForm',
    payload: data
  })

  expect(response.statusCode).toBe(200)
})

test('Get All reports by users test', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/form/getByUser/example@gmail.com'
  })

  expect(response.statusCode).toBe(200)
})