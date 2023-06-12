const Form = require('../models/form')
const SellingPoint = require('../models/sellingPoint')
const User = require('../models/user')
const ReportUtil = require('../util/report-util')

const PDFDocument = require('pdfkit')
const fs = require('fs')

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// M3_H3
exports.postForm = async (request, reply) => {
  // Get selling point data for report section
  const sellingPointData = await SellingPoint.fetchById(this.fastify, request.body.spId)
  const userData = await User.fetchUserByMail(this.fastify, request.body.mail)

  // Create PDF
  const doc = new PDFDocument({ autoFirstPage: false })
  doc.pipe(fs.createWriteStream('./uploads/reports/' + request.body.fileName + '.pdf'))

  // M6_H1, fill report
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
    request.body.duration,
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

  if (userData[0].id_role === 1) { // TBM
    formData = Form.fetchByUser(this.fastify, userData[0].id_user)
  } else if (userData[0].id_role === 2) { // Manager
    formData = Form.fetchByManagerUser(this.fastify, userData[0].id_user)
  } else { // Admin
    formData = Form.fetchAll(this.fastify)
  }

  return formData
}

exports.postReportMails = async (request, reply) => {
  const mailList = JSON.parse(request.body.mails).mails
  const userName = request.body.userName
  const fileName = request.body.fileName

  const { mailer } = this.fastify
  mailer.sendMail({
    to: mailList,
    subject: 'Reporte de auditoría de ' + userName,
    text: 'Reporte generado por el TBM se adjunta al correo:',
    attachments: [
      {
        fileName,
        path: './uploads/reports/' + fileName + '.pdf'
      }
    ]
  }, (errors, info) => {
    if (errors) {
      this.fastify.log.error(errors)
    }
  })
}

exports.getFormCountByUser = async (request, reply) => {
  const { mail } = request.params

  const userData = await User.fetchUserByMail(this.fastify, mail)
  let formData

  if (userData[0].id_role === 1) { // TBM
    formData = Form.fetchCountByUser(this.fastify, userData[0].id_user)
  } else if (userData[0].id_role === 2) { // Manager
    formData = Form.fetchCountByManagerUser(this.fastify, userData[0].id_user)
  } else { // Admin
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
