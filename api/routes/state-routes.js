const stateController = require('../controllers/state-controller')

async function stateRoutes (fastify, options) {
  stateController.fastify = fastify

  fastify.get('/getAllStates', { onRequest: [fastify.authenticate] }, stateController.getStates)

  fastify.get('/statesByUser/:idUser', { onRequest: [fastify.authenticate] }, stateController.getStatesByUser)
}

module.exports = stateRoutes
