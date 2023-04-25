const Question = require('../models/question')

exports.postQuestion = async (request, reply) => {
  await Question.addQuestion(
    this.fastify,
    request.body.qText,
    request.body.idArea,
    request.body.usingCamera,
    request.body.btnNa,
    request.file.filename,
    request.body.idCategory)

  return reply.code(200).send({ statusCode: 200 })
}

exports.getQuestions = (request, reply) => {
  const questionData = Question.fetchAll(this.fastify)
  return questionData
}

exports.getQuestionsBySection = (request, reply) => {
  const { idCategory, idSection } = request.params
  const questionData = Question.fetchQuestionsBySection(this.fastify, idCategory, idSection)

  return questionData
}

exports.deleteQuestions = async (request, reply) => {
  await Question.deleteQuestion(
    this.fastify, request.body[0].idCategory, request.body[0].idQuestion, request.body[0].order
    )
  
  return reply.code(200).send({ statusCode: 200 })
}
