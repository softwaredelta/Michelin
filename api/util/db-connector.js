
const fastifyPlugin = require('fastify-plugin')

async function conectorBD (fastify, options) {
  fastify.register(require('@fastify/mysql'), {
    connectionString: 'mysql://root@localhost/test'
  })
}

module.exports = fastifyPlugin(conectorBD)
