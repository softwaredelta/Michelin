const metricController = require('../controllers/metric-controller')

async function metricRoutes (fastify, options) {
  metricController.fastify = fastify

  fastify.get('/getAverageTime/:dStart/:dEnd/:zone/:user', metricController.fetchAverageTime)

  fastify.get('/getAverageGrade/:dStart/:dEnd/:zone/:user', metricController.fetchAverageGrade)

  fastify.get('/getAverageGradePDV/:dStart/:dEnd/:zone/:user', metricController.fetchAverageGradePDV)

  fastify.get('/getFormsCurrentMonth/:dStart/:dEnd/:zone/:user', metricController.fetchFormsCurrentMonth)

  fastify.get('/getFormsByMonth/:dStart/:dEnd/:zone/:user', metricController.fetchFormsByMonth)
  // { onRequest: [fastify.authenticate]}, metricController.fetchAverageTime)
}

module.exports = metricRoutes
