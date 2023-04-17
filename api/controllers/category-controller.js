const Category = require('../models/category')
const Question = require('../models/question')

exports.postQuestion = async (request, reply) => {
  await Question.addQuestion(
    this.fastify,
    request.qText,
    request.section,
    request.usingCamera,
    request.btnNa,
    request.file.originalname,
    request.questionOrder,
    request.idCategory)

  return reply.code(200).send({ statusCode: 200 })
}

exports.getQuestionsBySection = (request, reply) => {
  const { idCategory, section } = request.params
  const questionData = Category.fetchQuestionsBySection(this.fastify, idCategory, section)

  return questionData
}
