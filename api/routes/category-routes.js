const categoryController = require('../controllers/category-controller')

const multer = require('fastify-multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })
async function categoryRoutes (fastify, options) {
  categoryController.fastify = fastify

  fastify.post(
    '/postQuestion',
    categoryController.postQuestion)

  fastify.get('/:idCategory/:section/questions', categoryController.getQuestionsBySection)
  fastify.get('/getAllQuestions', categoryController.getQuestions)
}

module.exports = categoryRoutes
