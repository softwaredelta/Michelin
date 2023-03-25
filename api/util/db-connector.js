
const fastifyPlugin = require('fastify-plugin')

async function dbConnector (fastify, options) {
  fastify.register(require('@fastify/mysql'), {
    promise: true,
    connectionString: 'mysql://root@localhost/test'
  })
}

module.exports = fastifyPlugin(dbConnector)
