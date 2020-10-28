const requireDirectory = require('require-directory')
const serviceObj = requireDirectory(module)
const newServiceObj = { }
for (const key in serviceObj) {
  newServiceObj[key.replace('.s', 'S')] = serviceObj[key]
}
module.exports = newServiceObj
