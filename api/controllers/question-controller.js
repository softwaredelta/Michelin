const Question = require('../models/question')

exports.postQuestion = async (request, reply) => {
  // If placeholder file was sent, select uploaded file
  const placeholderName = (typeof request.body.file !== 'undefined' && request.body.file !== null)
    ? request.file.filename
    : 'default-placeholder.jpg'

  await Question.addQuestion(
    this.fastify,
    request.body.qText,
    request.body.idArea,
    request.body.usingCamera,
    request.body.btnNa,
    placeholderName,
    request.body.idCategory)

  return reply.code(200).send({ statusCode: 200 })
}

exports.editQuestion = async (request, reply) => {
  await Question.editQuestion(
    this.fastify,
    request.body.idQuestion,
    request.body.questionText,
    request.body.usingCamera,
    request.body.btnNa
  )
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

exports.getPlaceholder = async (request, reply) => {
  return reply.sendFile('/placeholders/' + request.params.fileName)
}
