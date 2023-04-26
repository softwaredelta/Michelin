require('dotenv').config()

const fastifyPlugin = require('fastify-plugin')

const localTestConnectionString = 'mysql://root1@localhost:8889/tests'
// const localTestConnectionString = 'mysql://root@localhost/tests'
const awsTestConnectionString = `mysql://${process.env.TEST_MYSQL_USER}:${process.env.TEST_MYSQL_PASSWORD}@${process.env.TEST_MYSQL_HOST}:${process.env.TEST_MYSQL_PORT}/${process.env.TEST_MYSQL_DB}`

const onDeployedEnv = false

async function dbConnector (fastify, options) {
  fastify.register(require('@fastify/mysql'), {
    promise: true,
    connectionString: onDeployedEnv ? awsTestConnectionString : localTestConnectionString
  })
}

module.exports = fastifyPlugin(dbConnector)
