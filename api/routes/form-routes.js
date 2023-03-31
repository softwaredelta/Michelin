const formController = require('../controllers/form-controller')

const multer = require('fastify-multer')

const upload = multer({ dest: 'uploads/' })

async function formRoutes (fastify, options) {
  formController.fastify = fastify

  fastify.post(
    '/uploadReport',
    { preHandler: upload.array('reportImages', 15) },
    formController.postForm)

  fastify.get('/Reporte', formController.loadReport)
}

module.exports = formRoutes
