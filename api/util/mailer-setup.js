const fastifyPlugin = require('fastify-plugin')

async function reportMailer (fastify, options) {
  fastify.register(require('fastify-mailer'), {
    defaults: { from: 'Back To Basics <' + process.env.MAIL_USER + '>' },
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    }
  })
}

module.exports = fastifyPlugin(reportMailer)
