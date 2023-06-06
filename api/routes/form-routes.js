const formController = require('../controllers/form-controller')

const multer = require('fastify-multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

async function formRoutes (fastify, options) {
  formController.fastify = fastify

  fastify.get('/getByUser/:mail', { onRequest: [fastify.authenticate] }, formController.getFormsByUser)

  fastify.get('/getCountByUser/:mail', { onRequest: [fastify.authenticate] }, formController.getFormCountByUser)

  fastify.post(
    '/postForm',
    {
      preHandler: upload.array('images', 40),
      onRequest: [fastify.authenticate]
    },
    formController.postForm)

  fastify.get('/report/:fileName', formController.loadReport)

  fastify.post('/sendEmails', { onRequest: [fastify.authenticate] }, formController.postReportMails)
}

module.exports = formRoutes
