const sectionController = require('../controllers/section-controller')

async function sectionRoutes (fastify) {
  sectionController.fastify = fastify

  fastify.get('/getSections',
  {
    onRequest: [fastify.authenticate]
  },
  sectionController.getSections)
  fastify.get('/getAreas', sectionController.getAreas)
  fastify.get('/getAreasBySection/:idSection', sectionController.getAreasBySection)
}

module.exports = sectionRoutes
