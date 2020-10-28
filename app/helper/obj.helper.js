const _ = require('lodash')

exports.sortObj = (obj) => {
  if (!_.isObject(obj)) return obj
  return _(obj).toPairs().sortBy(a => a[0]).thru(arr => {
    const ret = {}
    arr.forEach(a => {
      ret[a[0]] = a[1]
    })
    return ret
  }).value()
}
