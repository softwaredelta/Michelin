
const server = require('./app')({
  logger: true
},
false
)

server.listen({ port: 3080 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
