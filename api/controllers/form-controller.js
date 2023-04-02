const Form = require('../models/form')

exports.postForm = async (request, reply) => {
  // Create PDF
  await Form.createForm(this.fastify, 1, 1, 1, 1, 1, 1, 'test sp', request.body.fileName, 1, '01/01/2020')
  return reply.code(200).send({ statusCode: 200 })
}

exports.loadReport = (request, reply) => {
  const stream = require('fs').createReadStream('./uploads/reports/' + request.params.fileName)
  reply.send(stream).type('application/pdf').code(200)
}
