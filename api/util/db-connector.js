const fastifyPlugin = require('fastify-plugin')

const localConnectionString = 'mysql://root1:1@localhost:8889/back_to_basics'
const awsConnectionString = 'mysql://${process.env.MYSQL_USER}:${process.env.MYSQL_PASSWORD}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DB}'

const onDeployedEnv = process.env.ON_DEPLOY_ENV === 'true' || false

async function dbConnector (fastify, options) {
  fastify.register(require('@fastify/mysql'), {
    promise: true,
    connectionString: onDeployedEnv ? awsConnectionString : localConnectionString
  })
}

module.exports = fastifyPlugin(dbConnector)
