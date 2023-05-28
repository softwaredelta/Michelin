const server = require('./app')({
  logger: true,
  bodyLimit: 30 * 1024 * 1024
},
false
)

const optsLocal = { port: 3080 }
const optsAWS = { port: 3080, host: '0.0.0.0' }

const onDeployedEnv = process.env.ON_DEPLOY_ENV === 'true' || false

server.listen(onDeployedEnv ? optsAWS : optsLocal, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
