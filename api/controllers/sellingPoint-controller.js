const SellingPoint = require('../models/sellingPoint')

exports.getSellingPoints = (request, reply) => {
  const sellingPointData = SellingPoint.fetchAll(this.fastify)
  return sellingPointData
}
