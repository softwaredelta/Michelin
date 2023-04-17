const Category = require('../models/category')

exports.postQuestion = async (request, reply) => {
  await Category.addQuestion(
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
