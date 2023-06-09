const categoryController = require('../controllers/category-controller')

async function categoryRoutes (fastify, options) {
  categoryController.fastify = fastify

  fastify.get('/getAllCategories', { onRequest: [fastify.authenticate] }, categoryController.getCategories)
}

module.exports = categoryRoutes
