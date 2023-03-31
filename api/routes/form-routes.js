const formController = require('../controllers/form-controller')

const multer = require('fastify-multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/reports')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

async function formRoutes (fastify, options) {
  formController.fastify = fastify

  fastify.post(
    '/uploadReport',
    { preHandler: upload.single('report') },
    formController.postForm)

  fastify.get('/Reporte', formController.loadReport)
}

module.exports = formRoutes
