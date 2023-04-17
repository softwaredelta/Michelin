const sellingPointController = require('../controllers/sellingPoint-controller')

async function sellingPointRoutes (fastify, options) {
  sellingPointController.fastify = fastify

  fastify.get('/list', sellingPointController.getSellingPoints)
}

module.exports = sellingPointRoutes
