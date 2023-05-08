const State = require('../models/state')

exports.getStates = (request, reply) => {
  const stateData = State.fetchAll(this.fastify)
  return stateData
}

exports.getStatesByUser = (request, reply) => {
  const stateData = State.fetchByUser(this.fastify, request.params.idUser)
  return stateData
}

