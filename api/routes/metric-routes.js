const metricController = require('../controllers/metric-controller')

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M5_H1

async function metricRoutes (fastify, options) {
  metricController.fastify = fastify

  fastify.get('/getAverageTime/:dStart/:dEnd/:zone/:user', metricController.fetchAverageTime) // ready

  fastify.get('/getAverageGradeByMonth/:dStart/:dEnd/:zone/:user', metricController.fetchAverageGradeByMonth) // ready

  fastify.get('/getAverageGradeCur/:dStart/:dEnd/:zone/:user', metricController.fetchAverageGradeCur) // ready

  fastify.get('/getAverageGradePDV/:dStart/:dEnd/:zone/:user', metricController.fetchAverageGradePDV) // ready

  fastify.get('/getFormsCurrentMonth/:dStart/:dEnd/:zone/:user', metricController.fetchFormsCurrentMonth) // ready

  fastify.get('/getFormsByMonth/:zone/:user', metricController.fetchFormsByMonth) // ready

  fastify.get('/getFormsByMonthUser/:zone/:mail', metricController.fetchFormsByMonthUser)

  fastify.get('/getAverageTimeByMonth/:zone/:user', metricController.fetchAverageTimeByMonth) // ready
  // { onRequest: [fastify.authenticate]}, metricController.fetchAverageTime)
  fastify.get('/getUserMail/:mail', metricController.fetchByMail)
}

module.exports = metricRoutes
