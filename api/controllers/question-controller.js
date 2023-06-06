const Question = require('../models/question')
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

exports.postQuestion = async (request, reply) => {
  // If placeholder file was sent, select uploaded file
  const placeholderName = (typeof request.file !== 'undefined' && request.file !== null)
    ? request.file.filename
    : 'default-placeholder.jpg'
  // M4_H3
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
// M4_H2
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

// M4_H1
exports.getQuestions = (request, reply) => {
  const questionData = Question.fetchAll(this.fastify)
  return questionData
}

exports.getQuestionsBySection = (request, reply) => {
  const { idCategory, idSection } = request.params
  const questionData = Question.fetchQuestionsBySection(this.fastify, idCategory, idSection)
  return questionData
}

// M4_H4
exports.deleteQuestions = async (request, reply) => {
  await Question.deleteQuestion(
    this.fastify, request.body[0].idCategory, request.body[0].idQuestion, request.body[0].order
  )
  return reply.code(200).send({ statusCode: 200 })
}

exports.getPlaceholder = async (request, reply) => {
  return reply.sendFile('/placeholders/' + request.params.fileName)
}
