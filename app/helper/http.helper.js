const axios = require('axios')
const httpHelper = require('http')
const https = require('https')
// const _ = require('lodash')
// const qs = require('querystring')
const { HttpRequestError, HttpResponseError } = require('../error')

const build = (serviceName, baseUrl) => {
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 8000,
    httpAgent: new httpHelper.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true })
  })
  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    throw new HttpRequestError(serviceName, error)
  })

  // 响应拦截器
  instance.interceptors.response.use(response => {
    return response
  }, error => {
    throw new HttpResponseError(serviceName, error)
  })
  const get = async (path, headers = {}) => {
    if (!headers['Content-type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
    return instance.get(path, { headers })
  }
  const post = async (path, body, headers = {}) => {
    if (!headers['Content-type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
    return instance.post(path, body, { headers })
  }
  const put = async (path, body, headers = {}) => {
    if (!headers['Content-type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
    return instance.put(path, body, { headers })
  }
  const del = async (path, headers = {}) => {
    if (!headers['Content-type']) {
      headers['Content-type'] = 'application/json;charset=utf-8'
    }
    return instance.delete(path, { headers })
  }
  return {
    get,
    post,
    put,
    delete: del
  }
}

module.exports = {
  build
}
