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

  fastify.post(
    '/postForm',
    { preHandler: upload.single('reportImages') },
    formController.postForm)

  fastify.get('/report/:fileName', formController.loadReport)
}

module.exports = formRoutes
