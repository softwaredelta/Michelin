const SellingPoint = require('../models/sellingPoint')
const fastifyPlugin = require('fastify-plugin')

async function ratingScheduledUpdates (fastify, options) {
    fastify.register(require('fastify-cron'), {
        jobs: [
          {
            cronTime: '0 0 */14 * *', // at 00:00 on Monday
            onTick: async fastify => {
              await SellingPoint.updateSellingPointRating(fastify)
            }
          }
        ]
      })
  }
  
  module.exports = fastifyPlugin(ratingScheduledUpdates)