const Form = require('../models/form')
const SellingPoint = require('../models/sellingPoint')
const User = require('../models/user')
const ReportUtil = require('../util/report-util')

const PDFDocument = require('pdfkit')
const fs = require('fs')

exports.postForm = async (request, reply) => {
  // Get selling point data for report section
  const sellingPointData = await SellingPoint.fetchById(this.fastify, request.body.spId)
  const userData = await User.fetchUserByMail(this.fastify, request.body.mail)

  // Create PDF
  const doc = new PDFDocument({ autoFirstPage: false })
  doc.pipe(fs.createWriteStream('./uploads/reports/' + request.body.fileName + '.pdf'))
  await ReportUtil.generateReport(doc, request.body, sellingPointData)

  await Form.createForm(this.fastify,
    sellingPointData[0].id_category,
    userData[0].id_user,
    request.body.exteriorGrade,
    request.body.interiorGrade,
    request.body.clientGrade,
    request.body.managerGrade,
    sellingPointData[0].name,
    request.body.fileName + '.pdf',
    (Math.floor(request.body.duration / 60) * 100) + (request.body.duration % 60),
    getCurrentDateTimeSQL())

  return reply.code(200).send({ statusCode: 200 })
}

exports.loadReport = (request, reply) => {
  const stream = require('fs').createReadStream('./uploads/reports/' + request.params.fileName)
  reply.send(stream).type('application/pdf').code(200)
}

exports.getFormsByUser = async (request, reply) => {
  const { mail } = request.params

  const userData = await User.fetchUserByMail(this.fastify, mail)
  let formData

  if (userData[0].id_role === 1) {
    formData = Form.fetchByUser(this.fastify, userData[0].id_user)
  } else if (userData[0].id_role === 2) {
    formData = Form.fetchByManagerUser(this.fastify, userData[0].id_user)
  } else {
    formData = Form.fetchAll(this.fastify)
  }

  return formData
}

exports.getFormCountByUser = async (request, reply) => {
  const { mail } = request.params

  const userData = await User.fetchUserByMail(this.fastify, mail)
  let formData

  if (userData[0].id_role === 1) {
    formData = Form.fetchCountByUser(this.fastify, userData[0].id_user)
  } else if (userData[0].id_role === 2) {
    formData = Form.fetchCountByManagerUser(this.fastify, userData[0].id_user)
  } else {
    formData = Form.fetchCount(this.fastify)
  }

  return formData
}

function getCurrentDateTimeSQL () { // Date for query
  const date = new Date()

  const currentDate =
    date.getFullYear() +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    ('0' + date.getDate()).slice(-2) +
    ('0' + date.getHours()).slice(-2) +
    ('0' + date.getMinutes()).slice(-2) +
    ('0' + date.getSeconds()).slice(-2)

  return currentDate
}
