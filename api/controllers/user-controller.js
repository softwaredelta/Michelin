const User = require('../models/user')

exports.getUsers = (request, reply) => {
  const userData = User.fetchAll(this.fastify)
  return userData
}
