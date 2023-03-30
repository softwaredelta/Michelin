const User = require('../models/user')

exports.getUsers = (request, reply) => {
  const userData = User.fetchAll(this.fastify)
  return userData
}

exports.login = (request, reply) => {
  if (User.verifyUser(this.fastify, request.body.email, request.body.password)) {
    const token = this.fastify.jwt.sign({ mail: request.body.mail })
    return ({ token })
  }
}
