const sellingPointController = require('../controllers/sellingPoint-controller')

async function sellingPointRoutes (fastify, options) {
  sellingPointController.fastify = fastify

  fastify.get('/list', sellingPointController.getSellingPoints)

  fastify.post('/addSellingPoint', sellingPointController.addSellingPoints)

  fastify.post('/delete', sellingPointController.postDeleteSellingPoint)

  fastify.post('/editSellingPoint', sellingPointController.editSellingPoints)
}

module.exports = sellingPointRoutes
