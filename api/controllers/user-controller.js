const User = require('../models/user')

exports.getUsers = (request, reply) => {
  const userData = User.fetchAll(this.fastify)
  return userData
}

exports.login = async (request, reply) => {
  if (await User.verifyUser(this.fastify, request.body.email, request.body.password) === true) {
    const token = this.fastify.jwt.sign({ mail: request.body.email })
    reply.code(200).send({ token })
  } else {
    reply.code(400).send({ statusCode: 400 })
  }
}

exports.signup = async (request, reply) => {
  console.log(request.body)
  await User.createUser(this.fastify, request.body.name, request.body.lastName, request.body.idManager, request.body.mail, request.body.password, request.body.role, request.body.state)
  return reply.code(200).send({ statusCode: 200 })
}

exports.getRoles = async (request, reply) => {
  const roleData = User.getRoles(this.fastify)
  return roleData
}

exports.getManagers = async (request, reply) => {
  const managerData = User.getManager(this.fastify)
  return managerData
}

exports.editUsers = async (request, reply) => {
  await User.editUser(
    this.fastify,
    request.body.name,
    request.body.lastName,
    request.body.mail,
    request.body.idUser
  )

  return reply.code(200).send({ statusCode: 200 })
}

exports.postDeleteUsers = async (request, reply) => {
  await User.deleteUser(
    this.fastify,
    request.body.idUser)
}
