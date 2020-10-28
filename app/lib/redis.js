const Redis = require('ioredis')
const config = require('config').get('redis')
const logger = require('../helper/log.helper').getLogger('redis')

function retryStrategy (times) {
  return Math.min(times * 50, 2000)
}

const client = new Redis({
  port: config.port,
  host: config.host,
  password: config.password,
  db: config.db,
  keyPrefix: config.keyPrefix,
  retryStrategy,
  dropBufferSupport: true
})

client.on('connect', function () {
  logger.info(`redis host:${config.host} port:${config.port} connect successfully`)
})

client.on('error', function (err) {
  logger.error(`redis host:${config.host} port:${config.port} error`, err)
})

module.exports = client
