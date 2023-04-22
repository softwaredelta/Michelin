const SellingPoint = require('../models/sellingPoint')

exports.getSellingPoints = (request, reply) => {
  const sellingPointData = SellingPoint.fetchAll(this.fastify)
  return sellingPointData
}

exports.addSellingPoints = async (request, reply) => {
  await SellingPoint.addSellingPoint(
    this.fastify,
    request.body.type,
    request.body.zone,
    request.body.address,
    request.body.rating,
    request.body.name,
    request.body.phone
  )

  return reply.code(200).send({ statusCode: 200 })
}

exports.editSellingPoints = async (request, reply) => {
  await SellingPoint.editSellingPoint(
    this.fastify,
    request.body.type,
    request.body.zone,
    request.body.address,
    request.body.name,
    request.body.phone,
    request.body.id_sp
  )

  return reply.code(200).send({ statusCode: 200 })
}
