const formController = require('../controllers/form-controller')

const multer = require('fastify-multer')

const upload = multer({ dest: 'uploads/temp' })

async function formRoutes (fastify, options) {
  formController.fastify = fastify

  fastify.post(
    '/postForm',
    { preHandler: upload.array('reportImages', 15) },
    formController.postForm)

  fastify.get('/report/:fileName', formController.loadReport)
}

module.exports = formRoutes
