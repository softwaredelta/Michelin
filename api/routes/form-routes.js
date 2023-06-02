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

  fastify.get('/getByUser/:mail', formController.getFormsByUser)

  fastify.get('/getCountByUser/:mail', formController.getFormCountByUser)

  fastify.post(
    '/postForm',
    { preHandler: upload.array('images', 40) },
    formController.postForm)

  fastify.get('/report/:fileName', formController.loadReport)

  fastify.post('/sendEmails', formController.postReportMails)
}

module.exports = formRoutes
