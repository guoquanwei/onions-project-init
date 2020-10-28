const requireDirectory = require('require-directory')
const thirdPartObj = requireDirectory(module)
const newThirdPartObj = { }
for (const key in thirdPartObj) {
  newThirdPartObj[key.replace('.t', 'T')] = thirdPartObj[key]
}
module.exports = newThirdPartObj
