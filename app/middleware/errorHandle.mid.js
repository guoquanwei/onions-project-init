const pkg = require('../../package')
const logger = require('../helper/log.helper').getLogger('errorHandleMiddleware')
const { HttpRequestError, HttpResponseError } = require('../error')

module.exports = async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.status = 404
      if (process.env.NODE_ENV === 'development') {
        ctx.body = pkg.apidoc
        return
      }
      ctx.throw(404)
    }
  } catch (err) {
    logger.error(err)
    if (err instanceof HttpRequestError || err instanceof HttpResponseError) {
      ctx.status = 500
      ctx.body = {
        msg: '系统繁忙',
        debug: '系统繁忙',
        type: ''
      }
      return
    }
    if (err.status) {
      ctx.status = err.status
    } else {
      ctx.status = 500
    }
    ctx.body = {
      msg: err.message,
      debug: err.type,
      type: err.type
    }
  }
}
