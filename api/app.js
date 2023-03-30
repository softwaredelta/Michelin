const Fastify = require('fastify')

function buildFastify (opts = {}, testing) {
  const fastify = Fastify(opts)

  if (testing) {
    fastify.register(require('./util/test-db-connector'))
  } else {
    fastify.register(require('./util/db-connector'))
  }

  fastify.register(require('./util/jwt-setup'))
  fastify.register(require('./routes/user-routes'), { prefix: '/user' })

  return fastify
}

module.exports = buildFastify
