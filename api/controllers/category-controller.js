const Category = require('../models/category')
const Question = require('../models/question')

exports.postQuestion = async (request, reply) => {
  await Question.addQuestion(
    this.fastify,
    request.body.qText,
    request.body.section,
    request.body.usingCamera,
    request.body.btnNa,
    'holi.jpg',
    // request.file.originalname,
    request.body.questionOrder,
    request.body.idCategory)

  return reply.code(200).send({ statusCode: 200 })
}

exports.getQuestions = (request, reply) => {
  const questionData = Question.fetchAll(this.fastify)
  return questionData
}

exports.getQuestionsBySection = (request, reply) => {
  const { idCategory, section } = request.params
  const questionData = Category.fetchQuestionsBySection(this.fastify, idCategory, section)

  return questionData
}

exports.getCategories = (request, reply) => {
  const categoryData = Category.fetchAll(this.fastify)
  return categoryData
}
