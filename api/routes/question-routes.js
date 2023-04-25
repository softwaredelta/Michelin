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
    { preHandler: upload.single('placeholder') },
    questionController.postQuestion)

  fastify.post('/edit', questionController.editQuestion)
  fastify.get('/bySection/:idCategory/:idSection', questionController.getQuestionsBySection)
  fastify.get('/getAllQuestions', questionController.getQuestions)
  fastify.post('/deleteQuestion', questionController.deleteQuestions)
}

module.exports = questionRoutes
