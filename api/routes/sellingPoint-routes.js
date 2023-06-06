const sellingPointController = require('../controllers/sellingPoint-controller')

async function sellingPointRoutes (fastify, options) {
  sellingPointController.fastify = fastify

  fastify.get('/list', { onRequest: [fastify.authenticate] }, sellingPointController.getSellingPoints)

  fastify.post('/addSellingPoint', { onRequest: [fastify.authenticate] }, sellingPointController.addSellingPoints)

  fastify.post('/delete', { onRequest: [fastify.authenticate] }, sellingPointController.postDeleteSellingPoint)

  fastify.post('/editSellingPoint', { onRequest: [fastify.authenticate] }, sellingPointController.editSellingPoints)
}

module.exports = sellingPointRoutes
