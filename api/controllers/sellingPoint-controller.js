const SellingPoint = require('../models/sellingPoint')
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// M2_H4
exports.getSellingPoints = (request, reply) => {
  const sellingPointData = SellingPoint.fetchAll(this.fastify)
  return sellingPointData
}

// M2_H1
exports.addSellingPoints = async (request, reply) => {
  await SellingPoint.addSellingPoint(
    this.fastify,
    request.body.type,
    request.body.zone,
    request.body.address,
    request.body.name,
    request.body.phone
  )

  return reply.code(200).send({ statusCode: 200 })
}

// M2_H2
exports.postDeleteSellingPoint = async (request, reply) => {
  await SellingPoint.deleteSP(
    this.fastify,
    request.body.spId)
}

// M2_H3
exports.editSellingPoints = async (request, reply) => {
  await SellingPoint.editSellingPoint(
    this.fastify,
    request.body.type,
    request.body.zone,
    request.body.address,
    request.body.name,
    request.body.phone,
    request.body.spId
  )

  return reply.code(200).send({ statusCode: 200 })
}
