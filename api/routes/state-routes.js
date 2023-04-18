const stateController = require('../controllers/state-controller')

async function stateRoutes (fastify, options) {
  stateController.fastify = fastify

  fastify.get('/getAllStates', stateController.getStates)
}

module.exports = stateRoutes
