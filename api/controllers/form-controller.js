const Form = require('../models/form')
const PDFDocument = require('pdfkit')
const fs = require('fs')

exports.postForm = async (request, reply) => {
  // Create PDF
  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream('./uploads/reports/' + request.body.fileName))
  doc.image('./uploads/temp/' + request.file.originalname, 0, 0, {
    height: doc.page.height,
    width: doc.page.width
  })
  fs.unlinkSync('./uploads/temp/' + request.file.originalname)
  doc.end()

  await Form.createForm(this.fastify, 1, 1, 1, 1, 1, 1, 'test sp', request.body.fileName, 1, '01/01/2020')
  return reply.code(200).send({ statusCode: 200 })
}

exports.loadReport = (request, reply) => {
  const stream = require('fs').createReadStream('./uploads/reports/' + request.params.fileName)
  reply.send(stream).type('application/pdf').code(200)
}
