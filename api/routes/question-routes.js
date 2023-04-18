const questionController = require('../controllers/question-controller')

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
async function questionRoutes (fastify, options) {
  questionController.fastify = fastify

  fastify.post(
    '/postQuestion',
    { preHandler: upload.single('placeholder') },
    questionController.postQuestion)

  fastify.get('/bySection/:idCategory/:idSection', questionController.getQuestionsBySection)
  fastify.get('/getAllQuestions', questionController.getQuestions)
  fastify.get('/getAreas/bySection/:idSection', questionController.getAreasBySection)
}

module.exports = questionRoutes
