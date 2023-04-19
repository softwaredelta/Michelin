const State = require('../models/state')

exports.getStates = (request, reply) => {
  const stateData = State.fetchAll(this.fastify)
  return stateData
}
