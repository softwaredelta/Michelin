const sectionController = require('../controllers/section-controller')

async function sectionRoutes (fastify) {
  sectionController.fastify = fastify

  fastify.get('/getSections', { onRequest: [fastify.authenticate] }, sectionController.getSections)

  fastify.get('/getAreas', { onRequest: [fastify.authenticate] }, sectionController.getAreas)

  fastify.get('/getAreasBySection/:idSection', { onRequest: [fastify.authenticate] }, sectionController.getAreasBySection)
}

module.exports = sectionRoutes
