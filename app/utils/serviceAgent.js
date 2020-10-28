const config = require('config')
const _ = require('lodash')
const httpHelper = require('../helper/http.helper')

const serviceAgent = {}
_.forEach(config.get('servicesHost'), (v, k) => {
  serviceAgent[k] = httpHelper.build(k, v)
})

module.exports = serviceAgent
