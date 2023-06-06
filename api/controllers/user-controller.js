const User = require('../models/user')
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// M1_H9
exports.getUsers = (request, reply) => {
  const userData = User.fetchAll(this.fastify)
  return userData
}

exports.login = async (request, reply) => {
  const userResult = await User.verifyUser(this.fastify, request.body.email, request.body.password)

  if (userResult.status === true) { // Correct login credentials
    const token = this.fastify.jwt.sign({ mail: request.body.email })
    reply.code(200).send(
      {
        token, role: userResult.id_role, name: userResult.name, lastName: userResult.last_name, mail: request.body.email
      }
    )
  } else {
    reply.code(400).send({ statusCode: 400 })
  }
}

// M1_H1
exports.signup = async (request, reply) => {
  if (await User.createUser(this.fastify,
    request.body.name,
    request.body.lastName,
    request.body.idManager,
    request.body.mail,
    request.body.password,
    request.body.role,
    request.body.state) === true) {
    return reply.code(200).send({ statusCode: 200 })
  } else {
    return reply.code(400).send({ statusCode: 400 })
  }
}

exports.getRoles = async (request, reply) => {
  const roleData = User.getRoles(this.fastify)
  return roleData
}

exports.getManagers = async (request, reply) => {
  const managerData = User.getManager(this.fastify)
  return managerData
}

// M1_H2
exports.editUser = async (request, reply) => {
  await User.editUser(
    this.fastify,
    request.body.name,
    request.body.lastName,
    request.body.idUser,
    request.body.states
  )

  return reply.code(200).send({ statusCode: 200 })
}

exports.generateNewUserPassword = async (request, reply) => {
  await User.generateNewPassword(this.fastify, request.body.idUser, request.body.newPassword)
  return reply.code(200).send({ statusCode: 200 })
}

// M1_H3
exports.postDeleteUsers = async (request, reply) => {
  await User.deleteUser(
    this.fastify,
    request.body[0].idUser)
}
