
const server = require('./app')({
  logger: true
},
false
)

const optsLocal = { port: 3306 }
const optsAWS = { port: 3080, host: '0.0.0.0' }

const onDeployedEnv = process.env.ON_DEPLOY_ENV === 'true' || false

server.listen(onDeployedEnv ? optsAWS : optsLocal, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
