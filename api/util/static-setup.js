require('dotenv').config()
const path = require('path')

const fastifyPlugin = require('fastify-plugin')

async function staticFileServe (fastify, options) {
  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, '..', 'uploads'),
    prefix: '/uploads/'
  })
}

module.exports = fastifyPlugin(staticFileServe)
