class CheckError extends Error {
  constructor (status, message, type) {
    super(message)
    this.name = 'CheckError'
    this.type = type
    this.status = status
    this.expose = true
  }
}

class HttpError extends Error {
  constructor (serviceName, error) {
    super(error.message)
    this.serviceName = serviceName
    this.url = error.config.url
    this.method = error.config.method
    Error.captureStackTrace(error, this.constructor)
  }
}

class HttpRequestError extends HttpError {
  constructor (serviceName, error) {
    super(serviceName, error)
    this.name = 'HttpRequestError'
  }
}
class HttpResponseError extends HttpError {
  constructor (serviceName, error) {
    super(serviceName, error)
    this.name = 'HttpResponseError'
    this.body = error.response.data ? error.response.data : ''
    this.status = error.response.status
    this.headers = error.response.headers
  }
}

module.exports = {
  CheckError,
  HttpError,
  HttpRequestError,
  HttpResponseError
}
