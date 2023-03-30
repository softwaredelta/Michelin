const User = require('../models/user')

exports.getUsers = (request, reply) => {
  const userData = User.fetchAll(this.fastify)
  return userData
}

exports.login = (request, reply) => {
  if (User.verifyUser(this.fastify, request.body.email, request.body.password) === true) {
    const token = this.fastify.jwt.sign({ mail: request.body.mail })
    return ({ token })
  } else {
    reply.code(400).send({ statusCode: 400 })
  }
}

exports.signup = async (request, reply) => {
  await User.createUser(this.fastify, request.body.name, request.body.lastName, request.body.idManager, request.body.email, request.body.password)
  return reply.code(200).send({ statusCode: 200 })
}
