const _ = require('lodash')
const reqLogger = require('../helper/log.helper').getLogger('request')
const respLogger = require('../helper/log.helper').getLogger('response')

const headerNames = ['uid', 'content-type', 'authorization']

const requestLogger = async (ctx, next) => {
  const params = ctx.params || {}
  const search = ctx.query || {}
  const body = ctx.request.body || {}
  const message = {
    headers: _.pick(ctx.request.headers, headerNames),
    params,
    search,
    body
  }
  reqLogger.debug(JSON.stringify(message))
  await next()
}

const responseLogger = async (ctx, next) => {
  await next()
  const body = ctx.body || {}
  const headers = _.pick(ctx.response.headers, headerNames)
  const message = {
    headers,
    body: typeof body === 'object' ? body : JSON.parse(body)
  }
  respLogger.debug(JSON.stringify(message))
}

module.exports = {
  requestLogger,
  responseLogger
}
