const router = require('koa-router')()
const { name, version } = require('../../package')
const _ = require('lodash')
const requireDirectory = require('require-directory')
const routes = requireDirectory(module)

router.all('/', async (ctx) => {
  ctx.body = { name, version, status: Date() }
})
_.forEach(routes, route => {
  router.use(route.routes())
})

module.exports = router
