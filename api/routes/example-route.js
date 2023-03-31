
async function exampleRoutes (fastify, options) {
  /*
  fastify.get('/', (request, reply) => {
    fastify.mysql.query(
      'SELECT idUsuario, nombre FROM usuarios',
      function onResult (err, result) {
        reply.send(err || result)
      }
    )
  })
  */

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })
}

module.exports = exampleRoutes
