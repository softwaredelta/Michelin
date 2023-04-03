const fastifyPlugin = require('fastify-plugin')
const fastifyEnv = require('@fastify/env')

const schema = {
  type: 'object',
  properties: {
    MYSQL_USER: {
      type: 'string'
    },
    MYSQL_PASSWORD: {
      type: 'string'
    },
    MYSQL_HOST: {
      type: 'string'
    },
    MYSQL_PORT: {
      type: 'string'
    },
    MYSQL_DB: {
      type: 'string'
    },
    ON_DEPLOY_ENV: {
      type: 'boolean'
    }
  }
}

const opts = {
  confKey: 'config',
  schema,
  dotenv: true
}

async function readEnv (fastify) {
  fastify.register(fastifyEnv, opts)
    .ready((err) => {
      if (err) console.error(err)
    })
}

module.exports = fastifyPlugin(readEnv)
