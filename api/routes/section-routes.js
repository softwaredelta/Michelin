const sectionController = require('../controllers/section-controller')

async function sectionRoutes (fastify) {
  sectionController.fastify = fastify

  fastify.get('/getSections', sectionController.getSections)
  fastify.get('/getAreas', sectionController.getAreas)
  fastify.get('/getAreasBySection/:idSection', sectionController.getAreasBySection)
}

module.exports = sectionRoutes
