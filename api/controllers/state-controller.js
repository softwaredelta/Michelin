const State = require('../models/state')
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
exports.getStates = (request, reply) => {
  const stateData = State.fetchAll(this.fastify)
  return stateData
}

//  M1_H2
exports.getStatesByUser = (request, reply) => {
  const stateData = State.fetchByUser(this.fastify, request.params.idUser)
  return stateData
}
