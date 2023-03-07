const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./util/db-connector'))
fastify.register(require('./routes/example-route'))

fastify.listen({ port: 3080 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
