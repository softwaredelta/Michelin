const questionController = require('../controllers/question-controller')

const multer = require('fastify-multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/placeholders')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage })

async function questionRoutes (fastify, options) {
  questionController.fastify = fastify

  fastify.post(
    '/postQuestion',
    {
      preHandler: upload.single('placeholder'),
      onRequest: [fastify.authenticate]
    },
    questionController.postQuestion)

  fastify.post('/edit', { onRequest: [fastify.authenticate] }, questionController.editQuestion)

  fastify.get('/bySection/:idCategory/:idSection', { onRequest: [fastify.authenticate] }, questionController.getQuestionsBySection)

  fastify.get('/getAllQuestions', { onRequest: [fastify.authenticate] }, questionController.getQuestions)

  fastify.post('/deleteQuestion', { onRequest: [fastify.authenticate] }, questionController.deleteQuestions)

  fastify.get('/placeholder/:fileName', { onRequest: [fastify.authenticate] }, questionController.getPlaceholder)
}

module.exports = questionRoutes
