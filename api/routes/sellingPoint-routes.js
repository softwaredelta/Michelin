const sellingPointController = require('../controllers/sellingPoint-controller')

async function sellingPointRoutes (fastify, options) {
  sellingPointController.fastify = fastify

  fastify.get('/list', sellingPointController.getSellingPoints)

  fastify.post('/addSellingPoint', sellingPointController.addSellingPoints)
}

module.exports = sellingPointRoutes
