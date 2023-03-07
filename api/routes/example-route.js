
async function exampleRoutes (fastify, options) {
  fastify.get('/', (request, reply) => {
    fastify.mysql.query(
      'SELECT idUsuario, nombre FROM usuarios',
      function onResult (err, result) {
        reply.send(err || result)
      }
    )
  })
}

module.exports = exampleRoutes
