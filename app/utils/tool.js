const _ = require('lodash')
const compareVersions = require('compare-versions')
exports.needFilterMultipleChoice = (headers = {}, query = {}) => {
  const teacherAppFlag = headers['client-category']
  const isTeacherApp = teacherAppFlag && teacherAppFlag === 'teacher'
  let clientVersion = headers['client-version']
  if (clientVersion && _.indexOf(clientVersion, '-') > 0) {
    clientVersion = _.split(clientVersion, '-')[0]
  }
  // 过滤多选题 multi_choice  节点：可以过滤题型
  return (isTeacherApp && clientVersion && compareVersions.compare(clientVersion, '1.3.0', '<')) || (!isTeacherApp && clientVersion && clientVersion < '5.8.0')
  // return (isTeacherApp && clientVersion && compareVersions.compare(clientVersion, '1.3.0', '<')) || (!isTeacherApp && clientVersion && clientVersion < '5.8.0') || (query && query.isHomework === '1')
}
